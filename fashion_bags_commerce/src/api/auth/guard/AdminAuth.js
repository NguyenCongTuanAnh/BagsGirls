import { useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { getToken } from '../helper/UserCurrent';

const AdminAuth = ({ children }) => {
  const token = getToken();
  const userInfo = JSON.parse(localStorage.getItem('usersTokenString'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate('/login');
    }
    if (userInfo === null) {
      navigate('/login');
    } else {
      if (userInfo.role !== 'ROLE_ADMIN') {
        navigate('/unauthorized');
      }
    }
  }, []);

  return children;
};

export default AdminAuth;
