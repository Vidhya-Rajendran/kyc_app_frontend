
import axios from 'axios';

console.log(process.env.VUE_APP_BACKEND_URL, 'process.env.BACKEND_URL')

const API = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL + '/api',
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
        