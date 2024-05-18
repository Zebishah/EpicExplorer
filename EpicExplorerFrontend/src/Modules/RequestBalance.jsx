import axios from "axios";
import { useNavigate } from "react-router-dom";
const RequestBalance = () => {
     let navigate = useNavigate();
  const requestBalance = async() => {
    console.log("hey")
    let amount=100;
 try {
            const response = await axios.post('http://localhost:5000/User/requestBalance', { amount }, {
                headers: {
                    auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzA2OWM1OWI3MjgzOTFjMmE2ZTk0OCIsImlhdCI6MTcxNTc4NDg5MywiZXhwIjoxNzE2Mzg5NjkzfQ.VhmaXAsaiUtoWOoJhzP4R6gWuiDK2O_xpc6GcQgR9x4',
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;
            if(data.success===true){
navigate()
            }
            console.log('Successful');
        } catch (error) {
            console.error('Error:', error);
        }

  };
  return (
    <div>
      <button className="bg-orange-500 text-black p-10" onClick={requestBalance}>
        RequestBalance
      </button>
    </div>

  )
}

export default RequestBalance