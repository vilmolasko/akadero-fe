import { getToken } from '@/lib/session';
import axios from 'axios';

async function useToken() {
  if (typeof window !== 'undefined') {
    const token = await getToken();
    return token;
  }
  return '';
}

const baseURL = process.env.BASE_URL || 'https://akadero-be.vercel.app';
const http = axios.create({
  baseURL: baseURL + `/api`,
  timeout: 30000,
});

http.interceptors.request.use(
  async (config) => {
    const token = await useToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
