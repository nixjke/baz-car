import axios from 'axios';
import { API_CONFIG } from './constants';

const axiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: 10 * 1000,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        if (config.method !== 'get') {
            return config;
        }

        const cacheKey = `${config.url}${JSON.stringify(config.params || {})}`;
        const cachedResponse = sessionStorage.getItem(cacheKey);
        
        if (cachedResponse) {
            const { data, timestamp } = JSON.parse(cachedResponse);
            const now = Date.now();
            
            // Check if cache is still valid (5 minutes)
            if (now - timestamp < 5 * 60 * 1000) {
                // Return cached response
                return Promise.reject({
                    __CACHE__: true,
                    data
                });
            }
            
            // Remove expired cache
            sessionStorage.removeItem(cacheKey);
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for caching
axiosInstance.interceptors.response.use(
    (response) => {
        // Only cache GET requests
        if (response.config.method === 'get') {
            const cacheKey = `${response.config.url}${JSON.stringify(response.config.params || {})}`;
            const cacheData = {
                data: response.data,
                timestamp: Date.now()
            };
            sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
        }
        return response;
    },
    (error) => {
        // If this is a cached response, return it
        if (error.__CACHE__) {
            return Promise.resolve(error);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 