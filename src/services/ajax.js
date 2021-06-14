import axios from 'axios';
import { rollbar } from '@/rollbar';
// import store from '@/store';

const ajax = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true
});

ajax.defaults.headers['Content-Type'] = 'application/json';

// We use interceptor so as to always fetch the latest token
ajax.interceptors.request.use(request => {
  const token = localStorage.getItem('auth_token');
  if (token) request.headers['Authorization'] = `Bearer ${token}`;
  return request;
});

ajax.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!error.response) {
      // We can handle no connection here, e.g. show a toast message
    }
    if (error.response?.status === 403) {
      alert(
        `Incorrect permissions! If you think something is wrong, please contact ${process.env.VUE_APP_ADMINISTRATOR_CONTACT_EMAIL}`
      );
    }
    if (process.env.VUE_APP_ROLLBAR) rollbar.error('API error:', error);
    return Promise.reject(error);
  }
);

export { ajax };
