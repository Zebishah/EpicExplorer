// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './src/Redux/RootReducer';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
axios.defaults.baseURL = apiBaseUrl.replace(/\/$/, '');
axios.interceptors.request.use((request) => {
    if (request.url?.startsWith('http://localhost:5000')) {
        request.url = request.url.slice('http://localhost:5000'.length) || '/';
    }
    return request;
});

const Store = configureStore({
    reducer: rootReducer,
});

export default Store;
