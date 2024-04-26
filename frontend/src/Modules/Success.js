import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Success = () => {
    const { amount } = useParams();
    console.log(amount)
    useEffect(() => {
        requestBalance(amount);
    }, []);
    const requestBalance = async (amount) => {

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
    };
    return (
        <div>
            <h2 className='text-xl'>Successful</h2>
            <h2 className='text-xl'>Successful</h2>
            <h2 className='text-xl'>Successful</h2>
            <h2 className='text-xl'>Successful</h2>
        </div>
    );
};

export default Success;
