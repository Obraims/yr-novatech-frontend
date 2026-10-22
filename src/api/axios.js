import axios from 'axios';

// Configure Axios instance using environment variable or fallback to production Task 3 API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://yr-novatech-rest-api.vercel.app/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor for friendly error formatting
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'An unexpected network error occurred';
    if (error.response) {
      // Server responded with error code (4xx, 5xx)
      message = error.response.data?.error || error.response.data?.message || `HTTP ${error.response.status} Error`;
      if (error.response.data?.errors) {
        const validationMsgs = error.response.data.errors.map(err => err.message).join(', ');
        message = `${message}: ${validationMsgs}`;
      }
    } else if (error.request) {
      // Request was made but no response received
      message = 'Unable to reach the Expense Tracker REST API. Check your internet connection or CORS settings.';
    }
    const customError = new Error(message);
    customError.status = error.response?.status;
    customError.data = error.response?.data;
    return Promise.reject(customError);
  }
);

export default apiClient;
