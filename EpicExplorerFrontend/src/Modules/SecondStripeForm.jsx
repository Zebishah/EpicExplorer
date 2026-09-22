import { loadStripe } from "@stripe/stripe-js";
import PropTypes from "prop-types";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ""
);
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
const SecondStripeForm = ({ sessionId, amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm sessionId={sessionId} amount={amount} />
    </Elements>
  );
};
SecondStripeForm.propTypes = {
  sessionId: PropTypes.string.isRequired, // sessionId is a required string
  amount: PropTypes.number.isRequired, // amount is a required number
};
export default SecondStripeForm;
