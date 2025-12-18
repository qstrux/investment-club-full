import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add token
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default {
    // Auth - Real JWT
    login(credentials) {
        return apiClient.post('/auth/login', credentials);
    },
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Traders
    getTraders() {
        return apiClient.get('/traders');
    },
    getTrader(id) {
        return apiClient.get(`/traders/${id}`);
    },

    // Chief Analyst
    getChiefAnalyst() {
        return apiClient.get('/chief-analyst');
    },
    getTradingRecords() {
        return apiClient.get('/trading-records');
    },

    // Resources
    getVideos() {
        return apiClient.get('/videos');
    },
    getStrategies() {
        return apiClient.get('/strategies');
    },

    // Admin Content  // --- Admin ---
    createVideo(videoConfig) {
        return apiClient.post('/admin/videos', videoConfig)
    },
    deleteVideo(id) {
        return apiClient.delete(`/admin/videos/${id}`)
    },
    // File Upload
    uploadImage(file) {
        const formData = new FormData()
        formData.append('image', file)
        return apiClient.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    // AI Tools
    getStockDiagnosis(data) {
        return apiClient.post('/ai-diagnosis', data)
    },

    // AI & System
    getAIPicks() {
        return apiClient.get('/ai-picks');
    },
    getMembershipLevels() {
        return apiClient.get('/membership-levels');
    },
    getAnnouncements() {
        return apiClient.get('/announcements');
    },

    // Auth
    login(credentials) {
        return apiClient.post('/auth/login', credentials);
    }
};
