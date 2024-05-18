import { loadStripe } from '@stripe/stripe-js';
import PropTypes from 'prop-types';

const stripePromise = loadStripe('pk_test_51OlT63EhRIYwGoSWf1KwCnKI6NoAfDGxmMPlWmKTKqiLV4n7GYEOWt0xqzjzE1rVsYGpCjB2hxupQWGkdK8OVnqE00nLgRNBzu');
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
const SecondStripeForm = ({ sessionId, amount } ) => {
  return (
     <Elements stripe={stripePromise}>
      <CheckoutForm sessionId={sessionId} amount={amount} />
    </Elements>
  )
}
SecondStripeForm.propTypes = {
  sessionId: PropTypes.string.isRequired, // sessionId is a required string
  amount: PropTypes.number.isRequired, // amount is a required number
};
export default SecondStripeForm