import { useLocation, Navigate, Outlet, Route, useNavigate } from 'react-router-dom';
import { getToken, getUserToken } from '../helper/UserCurrent';
import { useEffect } from 'react';

const StaffAuth = ({ children }) => {
  const token = getToken();
  const userInfo = JSON.parse(localStorage.getItem('usersTokenString'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null && userInfo === null) {
      navigate('/login');
    }
    if (userInfo === null) {
      navigate('/login');
    } else {
      if (userInfo.role !== 'ROLE_STAFF' || userInfo.role !== 'ROLE_ADMIN') {
        navigate('/unauthorized');
      }
    }
  }, []);

  return children;
};

export default StaffAuth;
