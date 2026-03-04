import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return apiClient.post('/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const chatWithAI = async (message: string) => {
  return apiClient.post('/chat/', { question: message });
};