import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const fetchLocalNews = async () => {
    try {
        const response = await apiClient.get('/news/local');
        return response.data;
    } catch (error) {
        console.error("Error fetching local news:", error.response?.data || error.message);
        throw error;
    }
};

export const fetchNewsFromAPI = async () => {
    try {
        const response = await apiClient.get('/news/api');
        return response.data;
    } catch (error) {
        console.error("Error fetching news from API:", error.response?.data || error.message);
        throw error;
    }
};

export const fetchTrendingNews = async () => {
    try {
        const response = await apiClient.get('/news/trending');
        return response.data;
    } catch (error) {
        console.error("Error fetching trending news:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * @param {Object} newsData
 */
export const uploadNews = async (newsData) => {
    try {
        const response = await apiClient.post('/news', newsData);
        return response.data;
    } catch (error) {
        console.error("Error uploading news:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * @param {Object} credentials - {email, password}
 */
export const login = async (credentials) => {
    try {
        const response = await apiClient.post('/login', credentials);
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw error;
    }
}
