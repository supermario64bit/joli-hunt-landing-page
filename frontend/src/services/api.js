import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to format API error details
export const formatApiErrorDetail = (detail) => {
  if (detail == null) return 'Something went wrong. Please try again.';
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((e) => (e && typeof e.msg === 'string' ? e.msg : JSON.stringify(e)))
      .filter(Boolean)
      .join(' ');
  }
  if (detail && typeof detail.msg === 'string') return detail.msg;
  return String(detail);
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    return data;
  },

  register: async (email, password, name) => {
    const { data } = await api.post('/api/auth/register', { email, password, name });
    return data;
  },

  logout: async () => {
    const { data } = await api.post('/api/auth/logout');
    return data;
  },

  getMe: async () => {
    const { data } = await api.get('/api/auth/me');
    return data;
  },

  forgotPassword: async (email) => {
    const { data } = await api.post('/api/auth/forgot-password', { email });
    return data;
  },

  resetPassword: async (token, newPassword) => {
    const { data } = await api.post('/api/auth/reset-password', {
      token,
      new_password: newPassword,
    });
    return data;
  },
};

// Blog API
export const blogAPI = {
  getAllPosts: async (category = null, search = null) => {
    const params = {};
    if (category) params.category = category;
    if (search) params.search = search;
    const { data } = await api.get('/api/blog/posts', { params });
    return data;
  },

  getPost: async (postId) => {
    const { data } = await api.get(`/api/blog/posts/${postId}`);
    return data;
  },

  createPost: async (postData) => {
    const { data } = await api.post('/api/blog/posts', postData);
    return data;
  },

  updatePost: async (postId, postData) => {
    const { data } = await api.put(`/api/blog/posts/${postId}`, postData);
    return data;
  },

  deletePost: async (postId) => {
    const { data } = await api.delete(`/api/blog/posts/${postId}`);
    return data;
  },
};

// User API
export const userAPI = {
  getAllUsers: async () => {
    const { data } = await api.get('/api/users');
    return data;
  },

  createUser: async (userData) => {
    const { data } = await api.post('/api/users', userData);
    return data;
  },

  updateUser: async (userId, userData) => {
    const { data } = await api.put(`/api/users/${userId}`, userData);
    return data;
  },

  deleteUser: async (userId) => {
    const { data } = await api.delete(`/api/users/${userId}`);
    return data;
  },
};

// Newsletter API
export const newsletterAPI = {
  subscribe: async (email) => {
    const { data } = await api.post('/api/newsletter/subscribe', { email });
    return data;
  },

  getSubscribers: async () => {
    const { data } = await api.get('/api/newsletter/subscribers');
    return data;
  },
};

export default api;
