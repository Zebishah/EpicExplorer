import { loadStripe } from '@stripe/stripe-js';
import PropTypes from 'prop-types';
const stripePromise = loadStripe('pk_test_51OlT63EhRIYwGoSWf1KwCnKI6NoAfDGxmMPlWmKTKqiLV4n7GYEOWt0xqzjzE1rVsYGpCjB2hxupQWGkdK8OVnqE00nLgRNBzu');
const CheckoutForm = ({sessionId, amount} ) => {
         const handleSubmit = async (event) => {
    event.preventDefault();

    // Use the Stripe.js library to create a token or a payment method
    const stripe = await stripePromise;
    const { id } = sessionId;
    const { error } = await stripe.redirectToCheckout({
      sessionId: id
    });

    if (error) {
      console.error(error);
    }
  };
  return (
 <form onSubmit={handleSubmit}>
      <button type="submit">Pay ${amount}</button>
    </form>
  )
}
CheckoutForm.propTypes = {
  sessionId: PropTypes.string.isRequired, // sessionId is a required string
  amount: PropTypes.number.isRequired, // amount is a required number
};
export default CheckoutForm