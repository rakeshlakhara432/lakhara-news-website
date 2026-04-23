import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lakhara_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const adminService = {
  getStats: () => api.get('/admin/dashboard-stats').then(res => res.data),
  
  // Members
  getMembers: () => api.get('/samaj/members').then(res => res.data),
  approveMember: (id: string) => api.put(`/samaj/members/${id}/approve`).then(res => res.data),
  deleteMember: (id: string) => api.delete(`/admin/members/${id}`).then(res => res.data),
  
  // Matrimonial
  getProfiles: () => api.get('/samaj/matrimonial').then(res => res.data), // To be added to SamajController
  approveProfile: (id: string) => api.put(`/admin/matrimonial/${id}/approve`).then(res => res.data),
  verifyProfile: (id: string) => api.put(`/admin/matrimonial/${id}/verify`).then(res => res.data),
  deleteProfile: (id: string) => api.delete(`/admin/matrimonial/${id}`).then(res => res.data),
  
  // Products
  getProducts: () => api.get('/shop/products').then(res => res.data),
  addProduct: (data: any) => api.post('/shop/products', data).then(res => res.data),
  updateProduct: (id: string, data: any) => api.put(`/shop/products/${id}`, data).then(res => res.data),
  deleteProduct: (id: string) => api.delete(`/shop/products/${id}`).then(res => res.data),
};

export const fileService = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  }
};

export default api;
