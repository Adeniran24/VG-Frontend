import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://localhost:7017',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const unwrapData = (response) => response.data;

export const konyvApi = {
  getAll: async () => {
    const response = await api.get('/Konyv');
    return unwrapData(response);
  },
  getOne: async (id) => {
    const response = await api.get(`/Konyv/${id}`);
    return unwrapData(response);
  },
  create: async (payload) => {
    const response = await api.post('/Konyv', payload);
    return unwrapData(response);
  },
  update: async (id, payload) => {
    const response = await api.put(`/Konyv/${id}`, payload);
    return unwrapData(response);
  },
  remove: async (id) => {
    await api.delete(`/Konyv/${id}`);
  },
};
