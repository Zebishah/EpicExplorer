import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const emailSlice = createSlice({
  name: "email",
  initialState: {
    email: null,
    // emailError: null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    // emailFailure: (state, action) => {
    //   state.loading = false;
    //   state.emailError = action.payload;
    // },
    // resetEmailState: (state) => {
    //   state.email = null;
    //   state.emailError = null;
    // },
  },
});

export const { setEmail } = emailSlice.actions;
// export const getEmail = () => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       `http://localhost:5000/User/verifyOTP`,
//       {}, // Include email in the request payload
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     dispatch(setEmail(response.data));
//     console.log("Successful email fetched");
//   } catch (error) {
//     dispatch(
//       emailFailure(error.response ? error.response.data : error.message)
//     );
//     console.error(
//       "Error:",
//       error.response ? error.response.data : error.message
//     );
//   }
// };
export const selectOtpEmail = (state) => state.email.email;

export default emailSlice.reducer;
