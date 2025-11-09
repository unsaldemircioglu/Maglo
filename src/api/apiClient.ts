// src/api/apiClient.ts
import axios from 'axios';

const token = localStorage.getItem('accessToken'); // Acess Token

const apiClient = axios.create({
  baseURL: 'https://case.nodelabs.dev/api',
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default apiClient;
