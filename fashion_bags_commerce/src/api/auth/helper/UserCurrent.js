import { jwtDecode } from 'jwt-decode';

export const getUserToken = () => {
  const userToken = JSON.parse(localStorage.getItem('usersTokenString'));
  console.log(userToken);
  return userToken || null;
};

export const getStaffIdUser = () => {
  const userToken = getStaffDetailUser();
  return userToken?.idUser || null;
};
export const getCustomerIdUser = () => {
  const userToken = getCustomerDetailUser();
  return userToken?.idUser || null;
};

export const getStaffToken = () => {
  const token = localStorage.getItem('staffToken');
  return token || null;
};
export const getCustomerToken = () => {
  const token = localStorage.getItem('customerToken');
  return token || null;
};

export const getStaffDetailUser = () => {
  const token = getStaffToken();
  return token ? jwtDecode(token) : null;
};
export const getCustomerDetailUser = () => {
  const token = getCustomerToken();
  return token ? jwtDecode(token) : null;
};
