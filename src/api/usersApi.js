import axios from 'axios';

const api = axios.create({
  baseURL:  import.meta.env.VITE_API_URL || '', // e.g. http://localhost:8000
  headers: { 'Content-Type': 'application/json' },
});

export const fetchUsers = () => api.get('users');
export const fetchUser = (id) => api.get(`users/${id}`);
export const createUser = (data) => api.post('users', data);
export const updateUser = (id, data) => api.put(`users/${id}`, data);
export const deleteUser = (id) => api.delete(`users/${id}`);

export default api;