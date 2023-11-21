import { jwtDecode } from 'jwt-decode';

export const getUserToken = () => {
  const userToken = JSON.parse(localStorage.getItem('usersTokenString'));
  console.log(userToken);
  return userToken || null;
};

export const getIdUser = () => {
  const userToken = getDetailUser();
  return userToken?.idUser || null;
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token || null;
};

export const getDetailUser = () => {
  const token = getToken();
  return token ? jwtDecode(token) : null;
};
