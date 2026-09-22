import { useState, useEffect } from "react";
import SecondStripeForm from "./SecondStripeForm";
import axios from "axios";

const StripeMainForm = () => {
  const [sessionId, setSessionId] = useState("");
  const [amount, setAmount] = useState("");
  useEffect(() => {
    const fetchSessionId = async () => {
      try {
        const response = await axios.post("/User/create-checkout-session", {});
        setSessionId(response.data.sessionId);
        setAmount(response.data.amount);
      } catch (error) {
        console.error("Unable to create checkout session", error);
      }
    };
    fetchSessionId();
  }, []);

  return (
    <div>
      <h1>Stripe Payment Form</h1>
      <SecondStripeForm sessionId={sessionId} amount={amount} />
    </div>
  );
};

export default StripeMainForm;
