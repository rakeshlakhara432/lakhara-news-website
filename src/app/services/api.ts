import axios from 'axios';
import { samajService } from './samajService';

const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
const API_BASE_URL = isLocal ? 'http://localhost:8080/api' : 'https://api.lakhara.com/api'; // Replace with real production API if available

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
  getStats: async () => {
    try {
      return await api.get('/admin/dashboard-stats').then(res => res.data);
    } catch (e) {
      // Fallback: Fetch real counts from Firebase
      try {
        const { getDocs, collection } = await import("firebase/firestore");
        const { db } = await import("../data/firebase");
        
        const memberSnap = await getDocs(collection(db, "members"));
        const newsSnap = await getDocs(collection(db, "samaj_news"));
        const matrimonialSnap = await getDocs(collection(db, "matrimonial"));
        const eventSnap = await getDocs(collection(db, "events"));

        return { 
          success: true, 
          data: { 
            totalMembers: memberSnap.size, 
            pendingMembers: memberSnap.docs.filter(d => !d.data().approved).length, 
            totalArticles: newsSnap.size, 
            totalProfiles: matrimonialSnap.size, 
            totalEvents: eventSnap.size 
          } 
        };
      } catch (err) {
        return { success: true, data: { totalMembers: 0, pendingMembers: 0, totalArticles: 0, totalProfiles: 0, totalEvents: 0 } };
      }
    }
  },
  
  // Members
  getMembers: () => api.get('/samaj/members').then(res => res.data).catch(() => 
    samajService.getAllMembers().then(d => ({ success: true, data: d }))
  ),
  approveMember: (id: string) => api.put(`/admin/members/${id}/approve`).then(res => res.data).catch(() => 
    samajService.approveMember(id).then(() => ({ success: true, message: "Approved via Firebase" }))
  ),
  deleteMember: (id: string) => api.delete(`/admin/members/${id}`).then(res => res.data).catch(() => 
    samajService.deleteMember(id).then(() => ({ success: true }))
  ),
  
  // Matrimonial
  getProfiles: () => api.get('/samaj/matrimonial').then(res => res.data).catch(() =>
    samajService.getAllMatrimonial().then(d => ({ success: true, data: d }))
  ),
  approveProfile: (id: string) => api.put(`/admin/matrimonial/${id}/approve`).then(res => res.data).catch(() =>
    samajService.updateMatrimonial(id, { isApproved: true }).then(() => ({ success: true }))
  ),
  verifyProfile: (id: string) => api.put(`/admin/matrimonial/${id}/verify`).then(res => res.data),
  deleteProfile: (id: string) => api.delete(`/admin/matrimonial/${id}`).then(res => res.data).catch(() =>
    samajService.deleteMatrimonial(id).then(() => ({ success: true }))
  ),
  
  // Products
  getProducts: () => api.get('/shop/products').then(res => res.data),
  addProduct: (data: any) => api.post('/shop/products', data).then(res => res.data),
  updateProduct: (id: string, data: any) => api.put(`/shop/products/${id}`, data).then(res => res.data),
  deleteProduct: (id: string) => api.delete(`/shop/products/${id}`).then(res => res.data),
  
  getAnalytics: () => api.get('/admin/analytics').then(res => res.data).catch(async () => {
    try {
        const { getDocs, collection } = await import("firebase/firestore");
        const { db } = await import("../data/firebase");
        const memberSnap = await getDocs(collection(db, "members"));
        const newsSnap = await getDocs(collection(db, "samaj_news"));

        return {
            success: true,
            data: {
                totalViews: 0, // Views need a tracking system
                newReviews: 0,
                activeUsers: memberSnap.size,
                revenue: 0,
                growth: {
                    labels: ["Members", "News", "Matrimony"],
                    data: [memberSnap.size, newsSnap.size, 0]
                }
            }
        };
    } catch {
        return {
            success: true,
            data: { totalViews: 0, newReviews: 0, activeUsers: 0, revenue: 0, growth: { labels: [], data: [] } }
        };
    }
  }),
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
