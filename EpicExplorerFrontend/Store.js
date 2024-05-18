// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './src/Redux/RootReducer';

const Store = configureStore({
    reducer: rootReducer,
});

export default Store;
