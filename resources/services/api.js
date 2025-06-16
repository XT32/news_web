import axios from 'axios';
const API_BASE = 'http://localhost:8000/api';

export const fetchLocalNews = async () => {
    const response = await axios.get(`${API_BASE}/news/local`);
    return response.data;
};
export const fetchApiNews = async () => {
    const response = await axios.get(`${API_BASE}/news/api`);
    return response.data;
};
export const fetchTrendingNews = async () => {
    const response = await axios.get(`${API_BASE}/news/trending`);
    return response.data;
};
export const uploadNews = async (data) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE}/news`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
