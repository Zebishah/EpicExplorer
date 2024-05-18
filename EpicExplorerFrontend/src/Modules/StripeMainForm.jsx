import { useState,useEffect } from "react";
import SecondStripeForm from "./SecondStripeForm";
import axios from "axios";

const StripeMainForm = () => {
   const [sessionId, setSessionId] = useState('');
    const [amount, setAmount] = useState('');
    useEffect(() => {

      
        const fetchSessionId = async () => {
           
            const response = await axios.post('http://localhost:5000/User/create-checkout-session', {}, {
                headers: {
                    auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzA2OWM1OWI3MjgzOTFjMmE2ZTk0OCIsImlhdCI6MTcxNTY2NDY0NSwiZXhwIjoxNzE2MjY5NDQ1fQ.8-4EAVz08Gcu7LX-Scg6wolBxu2z7eFBg2XVfMvX19c',
                    'Content-Type': 'application/json',
                },
            });
             console.log(response)
            setSessionId(response.data.sessionId);
           setAmount(response.data.amount);
        };
        fetchSessionId();
    }, []);

  return (
    <div>
      <h1>Stripe Payment Form</h1>
      <SecondStripeForm sessionId={sessionId} amount={amount} />
    </div>
  )
}

export default StripeMainForm
