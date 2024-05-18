import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    signUpRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signUpRequest, signUpSuccess, signUpFailure } = loginSlice.actions;

export const signUp = ({ id, amount }) => async (dispatch) => {
  dispatch(signUpRequest());
  try {
    const response = await axios.post(`http://localhost:5000/User/stellarPayment/${id}`, { amount }, {
      headers: {
        auth_token: 'your_auth_token',
        'Content-Type': 'application/json',
      },
    });
    dispatch(signUpSuccess(response.data));
    console.log('Successful payment');
  } catch (error) {
    dispatch(signUpFailure(error.response ? error.response.data : error.message));
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};

export default loginSlice.reducer;