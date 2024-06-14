import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Change this to your server's base URL
});

export default api;
