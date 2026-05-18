import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getInstruments = async () => {
  const response = await api.get('/instruments');
  return response.data;
};

export const getInstrumentById = async (id) => {
  const response = await api.get(`/instruments/${id}`);
  return response.data;
};

export const createInstrument = async (instrument) => {
  const response = await api.post('/instruments', instrument);
  return response.data;
};
