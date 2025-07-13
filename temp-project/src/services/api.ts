import axios from 'axios';

// Cấu hình base URL cho API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://like.vn/api/v2';

// API Key - nên lưu trong environment variable
const API_KEY = process.env.REACT_APP_API_KEY || '5ec2bb6f367cf932ebf109c0a250cfb5';

// Tạo instance axios với cấu hình mặc định
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)'
  },
});

// Interceptor để thêm API key vào tất cả requests
apiClient.interceptors.request.use(
  (config) => {
    // Thêm API key vào tất cả requests
    if (config.data) {
      config.data.key = API_KEY;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý response
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient; 