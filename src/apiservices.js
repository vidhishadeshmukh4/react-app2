// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3008/api';

export const fetchLowStockItems = async () => {
    try {
        const token = localStorage.getItem('token'); // Get token from local storage

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.get(`${API_BASE_URL}/low-stock`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('API error:', error.response.status, error.response.data);
            if (error.response.status === 401 || error.response.status === 403) {
                // Handle unauthorized access
                console.log('Redirecting to login...');
                // Optionally redirect to login page
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error setting up request:', error.message);
        }
    }
};
