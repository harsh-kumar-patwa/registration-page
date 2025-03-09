import axios from 'axios';

const API_BASE_URL = 'https://registration-page-backend-1.onrender.com/';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add request interceptor
api.interceptors.request.use(
    (config) => {
        config.headers['Access-Control-Allow-Origin'] = 'true';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const createUser = (userData) => api.post('/users', userData);
export const getUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const getGenderOptions = () => api.get('/users/gender/options');