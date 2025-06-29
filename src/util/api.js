import axios from 'axios';

// Create an Axios instance with a base URL and credentials
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASEURL, // Parse backend URL from environment variables
    withCredentials: true, // Include cookies in requests
});

export default api;