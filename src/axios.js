import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://critix-backend.onrender.com/api/movies/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
