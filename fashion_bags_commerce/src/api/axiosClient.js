import axios from 'axios';
import { getToken } from './auth/helper/UserCurrent';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

//interceptor
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      window.location.href = '/not-found';
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
