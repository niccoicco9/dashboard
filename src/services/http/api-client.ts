import axios from 'axios';

export const apiClient = axios.create({
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);


