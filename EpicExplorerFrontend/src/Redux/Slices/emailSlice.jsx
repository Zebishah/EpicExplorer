import { createSlice } from "@reduxjs/toolkit";
const emailSlice = createSlice({
  name: "email",
  initialState: {
    email: null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = emailSlice.actions;
export const selectOtpEmail = (state) => state.email.email;

export default emailSlice.reducer;
