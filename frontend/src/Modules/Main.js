import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import axios from 'axios';
import CheckOutForm from './CheckOutFrom';



const stripePromise = loadStripe('pk_test_51OlT63EhRIYwGoSWf1KwCnKI6NoAfDGxmMPlWmKTKqiLV4n7GYEOWt0xqzjzE1rVsYGpCjB2hxupQWGkdK8OVnqE00nLgRNBzu');

function Main() {
    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        const fetchSessionId = async () => {
            const response = await axios.post('http://localhost:5000/User/create-checkout-session', {}, {
                headers: {
                    auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTRhNTE0ZDIzZjUzN2IzMWEyNmZkZiIsImlhdCI6MTcxMDA3MjQyOSwiZXhwIjoxNzEwNjc3MjI5fQ.sPdI-50i7aZDvT4bkGdnEUO_YYj7sSXZyP5skpbfS5w',
                    'Content-Type': 'application/json',
                },
            });
            setSessionId(response.data.sessionId);
        };
        fetchSessionId();
    }, []);

    return (
        <div className="App">
            {sessionId && (
                <Elements stripe={stripePromise}>
                    <CheckOutForm sessionId={sessionId} />
                </Elements>
            )}
        </div>
    );
}

export default Main;