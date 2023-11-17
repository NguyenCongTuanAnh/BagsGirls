import axiosClient from '../axiosClient';

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
};

export default AuthAPI;
