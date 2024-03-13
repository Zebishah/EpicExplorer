import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';

const CheckOutForm = ({ sessionId }) => {
    const [stripe, setStripe] = useState(null);

    useEffect(() => {
        const loadStripePromise = loadStripe('pk_test_51OlT63EhRIYwGoSWf1KwCnKI6NoAfDGxmMPlWmKTKqiLV4n7GYEOWt0xqzjzE1rVsYGpCjB2hxupQWGkdK8OVnqE00nLgRNBzu');

        loadStripePromise.then(setStripe);
    }, []);

    useEffect(() => {
        if (sessionId && stripe) {
            const sessionIdString = typeof sessionId === 'string' ? sessionId : sessionId.id;
            stripe.redirectToCheckout({ sessionId: sessionIdString });
        }

    }, [sessionId, stripe]);

    return <div>Loading...</div>;
};

export default CheckOutForm;