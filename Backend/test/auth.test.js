import test from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/IdFromToken.js';

const runMiddleware = (headers, secret = 'test-secret') => {
    process.env.JWT_SECRET = secret;
    let statusCode;
    let payload;
    const req = {
        header(name) {
            return headers[name.toLowerCase()];
        },
    };
    const res = {
        status(code) {
            statusCode = code;
            return this;
        },
        json(body) {
            payload = body;
            return this;
        },
    };
    let nextCalled = false;
    verifyToken(req, res, () => {
        nextCalled = true;
    });
    return { req, statusCode, payload, nextCalled };
};

test('rejects requests without credentials', () => {
    const result = runMiddleware({});
    assert.equal(result.statusCode, 401);
    assert.equal(result.nextCalled, false);
});

test('accepts Bearer authorization tokens', () => {
    const token = jwt.sign({ id: 'user-123' }, 'test-secret');
    const result = runMiddleware({ authorization: `Bearer ${token}` });
    assert.equal(result.nextCalled, true);
    assert.equal(result.req.userId, 'user-123');
});

test('rejects invalid tokens without exposing verification details', () => {
    const result = runMiddleware({ authorization: 'Bearer invalid' });
    assert.equal(result.statusCode, 401);
    assert.deepEqual(result.payload, {
        success: false,
        message: 'Invalid or expired token',
    });
});
