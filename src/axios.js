import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: 'https://critix-backend.onrender.com/api/movies/',
    headers: {
        'Content-Type': 'application/json',
        // Adding Authorization header (replace 'your_token' with actual token)
        'Authorization': 'sk4wd29vTUhBHZxSO6uL3WHyKqa9NIjk7RjbyHBqgukVlI9rGu909lIa40FTDw9VJV3Xr5idGRlx2cz7HbZeRcrbiOXZOy1iB3IwRlWd6UsJT40QGn7Cv0AF0mci3lZpr2lDVVguOlsmT3wzcmYrVm7qdt84y9FLEADMcXr1G8qsdmreSX3E',
    },
});

export default axiosInstance;
