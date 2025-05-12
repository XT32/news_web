import axios from 'axios';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchLocalNews = async () => {
    // Fetch news from the local database
    const response = await fetch('/api/news'); // Adjust the endpoint as necessary
    if (!response.ok) {
        throw new Error('Failed to fetch local news');
    }
    return await response.json();
};

export const fetchNewsFromAPI = async (category = 'general') => {
    try {
        const response = await axios.get(`${BASE_URL}/top-headlines`, {
            params: {
                category,
                apiKey: API_KEY,
            },
        });
        return response.data.articles;
    } catch (error) {
        console.error('Error fetching news from API:', error);
        throw error;
    }
};