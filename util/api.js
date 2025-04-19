// require('dotenv').config();
import axios from 'axios';

const prod_url = "https://recipe-book-backend-six.vercel.app/"
// console.log('API Base URL:', process.env.REACT_APP_API_BASEURL);

const api = axios.create({
    baseURL: prod_url, // Backend URL
    // baseURL: process.env.REACT_APP_API_BASEURL, // Backend URL
    withCredentials: true, // Include cookies in requests
});

export default api;