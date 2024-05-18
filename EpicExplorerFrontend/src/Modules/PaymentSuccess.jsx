import axios from "axios";
const PaymentSuccess = () => {
             const payAmount = async (event) => {
    event.preventDefault();
        console.log("hey")
        let id='6639e47c336b542a1f4da15e';
    let amount=100;
 try {
            const response = await axios.post(`http://localhost:5000/User/stellarPayment/${id}`, { amount }, {
                headers: {
                    auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzA2OWM1OWI3MjgzOTFjMmE2ZTk0OCIsImlhdCI6MTcxNTc4NDg5MywiZXhwIjoxNzE2Mzg5NjkzfQ.VhmaXAsaiUtoWOoJhzP4R6gWuiDK2O_xpc6GcQgR9x4',
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;
          console.log(data)
            console.log('Successful payment');
        } catch (error) {
            if (error.response) {
          console.error('Error:', error.response.data);
          // Handle specific error response
        } else {
          console.error('Error:', error.message);
          // Handle other errors
        }
        }
             }
  return (
    <div>
        <p>You have already the requested Payment in your account</p>
<button type="submit" onClick={payAmount}>Now Pay</button>
    </div>
         
  )
}

export default PaymentSuccess