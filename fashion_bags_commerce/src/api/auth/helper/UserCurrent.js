import { jwtDecode } from 'jwt-decode';

export const getUserToken = () => {
  const userToken = localStorage.getItem('token');
  return userToken ? userToken : null;
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
