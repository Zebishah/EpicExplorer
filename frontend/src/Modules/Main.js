import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import axios from 'axios';
import CheckOutForm from './CheckOutFrom';



const stripePromise = loadStripe('pk_test_51OlT63EhRIYwGoSWf1KwCnKI6NoAfDGxmMPlWmKTKqiLV4n7GYEOWt0xqzjzE1rVsYGpCjB2hxupQWGkdK8OVnqE00nLgRNBzu');

function Main() {
    const [sessionId, setSessionId] = useState('');
    const [amount, setAmount] = useState('');
    useEffect(() => {
        const fetchSessionId = async () => {
            const response = await axios.post('http://localhost:5000/User/create-checkout-session', {}, {
                headers: {
                    auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGU3NGRhODlkYzYzNDdkZTRmNTZiMiIsImlhdCI6MTcxMjIyMzU3MCwiZXhwIjoxNzEyODI4MzcwfQ.DqOk7456QgYp_2CzKVKN-uAhl_66ynfxkjVl_vLq_zI',
                    'Content-Type': 'application/json',
                },
            });
            setSessionId(response.data.sessionId);
            setAmount(response.data.amount)
        };
        fetchSessionId();
    }, []);

    return (
        <div className="App">
            {sessionId && (
                <Elements stripe={stripePromise}>
                    <CheckOutForm sessionId={sessionId} amount={amount} />
                </Elements>
            )}
        </div>
    );
}

export default Main;