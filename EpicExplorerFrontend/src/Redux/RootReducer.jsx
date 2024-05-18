// reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import LoginSlice from './Slices/LoginSlice';
// Import your slice reducers here
// import counterReducer from './counterSlice';
// import todoReducer from './todoSlice';

const rootReducer = combineReducers({
  login: LoginSlice,
  // todo: todoReducer,
});

export default rootReducer;
