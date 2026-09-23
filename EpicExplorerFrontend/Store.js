// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './src/Redux/RootReducer';
import axios from 'axios';
import { clearSession } from './src/auth/session';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
axios.defaults.baseURL = apiBaseUrl.replace(/\/$/, '');
axios.interceptors.request.use((request) => {
    if (request.url?.startsWith('http://localhost:5000')) {
        request.url = request.url.slice('http://localhost:5000'.length) || '/';
    }
    const tokenKey = request.url?.startsWith('/Admin') ? 'adminToken' : 'jwtToken';
    const token = localStorage.getItem(tokenKey);
    if (token && !request.headers.Authorization) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const isAdminRequest = error.config?.url?.includes('/Admin');
            const kind = isAdminRequest ? 'admin' : 'user';
            const tokenKey = kind === 'admin' ? 'adminToken' : 'jwtToken';
            if (localStorage.getItem(tokenKey)) {
                clearSession(kind);
                window.location.replace(kind === 'admin' ? '/admin/login' : '/SignIn');
            }
        }
        return Promise.reject(error);
    }
);

const Store = configureStore({
    reducer: rootReducer,
});

export default Store;
