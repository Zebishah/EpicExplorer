const buckets = new Map();

const rateLimit = ({ windowMs, max, name }) => (req, res, next) => {
    const identity = `${name}:${req.ip}:${String(req.body?.email || '').trim().toLowerCase()}`;
    const now = Date.now();
    const current = buckets.get(identity);
    if (!current || current.resetAt <= now) {
        buckets.set(identity, { count: 1, resetAt: now + windowMs });
        return next();
    }
    if (current.count >= max) {
        return res.status(429).json({ success: false, code: 'RATE_LIMITED', message: 'Too many requests. Please wait and try again later.', retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000) });
    }
    current.count += 1;
    return next();
};

export const authRateLimit = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, name: 'auth' });
export const otpRateLimit = rateLimit({ windowMs: 10 * 60 * 1000, max: 5, name: 'otp' });
