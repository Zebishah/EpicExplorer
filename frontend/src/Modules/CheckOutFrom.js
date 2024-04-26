import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
const CheckOutForm = ({ sessionId, amount }) => {
    const [stripe, setStripe] = useState(null);
    const [message, setMessage] = useState(null)
    useEffect(() => {
        const loadStripePromise = loadStripe('pk_test_51OlT63EhRIYwGoSWf1KwCnKI6NoAfDGxmMPlWmKTKqiLV4n7GYEOWt0xqzjzE1rVsYGpCjB2hxupQWGkdK8OVnqE00nLgRNBzu');

        loadStripePromise.then(setStripe);
    }, []);

    useEffect(() => {
        if (sessionId && stripe) {
            const sessionIdString = typeof sessionId === 'string' ? sessionId : sessionId.id;

            const { error } = stripe.redirectToCheckout({ sessionId: sessionIdString });

            if (error) {
                console.warn('Error:', error);
            } else {
                // Call the success function
                console.log("asad")
            }



        }
    }, [sessionId, stripe]);
    // const handleCheckoutSession = async (sessionId, clientSecret, amount) => {
    //     const sessionIdString = typeof sessionId === 'string' ? sessionId : sessionId.id;

    //     const { error } = stripe.redirectToCheckout({ sessionId: sessionIdString });

    //     if (error) {
    //         console.warn('Error:', error);
    //     } else {
    //         // Call the success function
    //        console.log("asda")
    //     }
    // };
    const handleSuccess = async (sessionId, clientSecret, amount) => {
        try {
            const response = await axios.post('http://localhost:5000/User/requestBalance', { amount }, {
                headers: {
                    auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGU3NGRhODlkYzYzNDdkZTRmNTZiMiIsImlhdCI6MTcxMjIyMzU3MCwiZXhwIjoxNzEyODI4MzcwfQ.DqOk7456QgYp_2CzKVKN-uAhl_66ynfxkjVl_vLq_zI',
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;
            console.log(data);
            console.log('Successful');
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return <div>Loading...</div>;
};

export default CheckOutForm;