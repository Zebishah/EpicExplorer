import { useState, useEffect } from "react";
import SecondStripeForm from "./SecondStripeForm";
import axios from "axios";

const StripeMainForm = () => {
  const [sessionId, setSessionId] = useState("");
  const [amount, setAmount] = useState("");
  useEffect(() => {
    const fetchSessionId = async () => {
      const response = await axios.post(
        "http://localhost:5000/User/create-checkout-session",
        {},
        {
          headers: {
            auth_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGQ3MjM0ZDc1OTA4MzI1ZTA3NWZlNCIsImlhdCI6MTcxNjM1NTU5NiwiZXhwIjoxNzE2OTYwMzk2fQ._90KYlRErV9dTJCOR3HR8X3AsHdDz3rzDa5zifcaP5w",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
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
  );
};

export default StripeMainForm;
