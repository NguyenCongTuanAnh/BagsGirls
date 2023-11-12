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
};

export default AuthAPI;
