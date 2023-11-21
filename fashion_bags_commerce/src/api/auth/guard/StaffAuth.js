import { useLocation, Navigate, Outlet, Route, useNavigate } from 'react-router-dom';
import { getToken, getUserToken } from '../helper/UserCurrent';
import { useEffect, useState } from 'react';

const StaffAuth = ({ children }) => {
  const [accessChecked, setAccessChecked] = useState(false);
  const token = getToken();
  const userInfo = JSON.parse(localStorage.getItem('usersTokenString'));
  const navigate = useNavigate();

  useEffect(() => {
    const ischecked = async () => {
      if (token === null || userInfo === null) {
        navigate('/login');
      }
      if (userInfo === null) {
        navigate('/login');
      } else {
        if (userInfo.role !== 'ROLE_STAFF' && userInfo.role !== 'ROLE_ADMIN') {
          navigate('/unauthorized');
        }
      }
      setAccessChecked(true);
    };

    ischecked();
  }, [token, userInfo, navigate]);
  if (!accessChecked) {
    return null; // Hoặc có thể return một loading indicator
  }
  return children;
};

export default StaffAuth;
