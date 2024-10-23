import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL || '/api', // Set your API base URL
});

// Add a request interceptor to attach the token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token expiration or 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration or unauthorized access
      const logout = useAuthStore.getState().logout;
      logout(); // Call the logout function from Zustand
      const router = useRouter();
      router.push('/login'); // Redirect to login page
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
