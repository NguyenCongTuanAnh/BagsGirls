import axiosClient from '../axiosClient';
import axiosClientNotAuth from '../axiosClientNotAuth';

const AuthAPI = {
  login(data) {
    const url = '/api/authentication/login-basic';

    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  getUserToken() {
    const url = '/api/authentication/getUserToken';

    return axiosClient.get(url);
  },
  validateToken(token) {
    const url = '/api/authentication/validateToken?token=' + token;

    return axiosClientNotAuth.get(url);
  },
};

export default AuthAPI;
