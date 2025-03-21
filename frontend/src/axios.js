import axios from 'axios';

const token = localStorage.getItem('token')
// Create an instance of axios with your default configurations
const axiosInstance = axios.create({
  baseURL: 'https://outfiro-ecommerce-webapp.onrender.com/api', // Your base URL
  timeout: 10000,                    // Request timeout in ms
  // headers: {
  //   'Content-Type': 'application/json',
  //   // Add other headers if necessary (e.g. Authorization)
  // }
});

// You can add interceptors here if needed
axiosInstance.interceptors.request.use(
  (config) => {
    
    if (token) {
      config.headers['Authorization'] = `JWT ${token}`;
    }
    // You can modify the request here if needed (e.g., add auth token)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default axiosInstance;
