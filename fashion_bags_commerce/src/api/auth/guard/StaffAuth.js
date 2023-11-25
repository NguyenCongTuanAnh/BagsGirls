import { useLocation, Navigate, Outlet, Route, useNavigate } from 'react-router-dom';
import { getStaffToken, getUserToken } from '../helper/UserCurrent';
import { useEffect, useState } from 'react';
import AuthAPI from '../AuthAPI';
import { notification } from 'antd';

const clearAuthToken = () => {
  localStorage.removeItem('staffTokenString');
  localStorage.removeItem('staffId');
  localStorage.removeItem('token');
};
const validateToken = async (token) => {
  const response = await AuthAPI.validateToken(token);
  console.log(JSON.stringify(response.data));
  return JSON.stringify(response.data);
};
const StaffAuth = ({ children }) => {
  const [accessChecked, setAccessChecked] = useState(false);
  const token = getStaffToken();
  const userInfo = JSON.parse(localStorage.getItem('staffTokenString'));
  const navigate = useNavigate();
  const validateToken = async (token) => {
    const response = await AuthAPI.validateToken(token);
    if (JSON.stringify(response.data) === 'false') {
      notification.info({
        message: 'Lỗi',
        description: 'Phiên đăng nhập đã hết hạn!!!!',
        duration: 2,
      });
      clearAuthToken();
      navigate('/login');
    }
  };
  useEffect(() => {
    const ischecked = async () => {
      validateToken(token);
      if (token === null || userInfo === null) {
        navigate('/login');
      }
      if (userInfo === null) {
        navigate('/login');
      } else {
        if (userInfo.users.role !== 'ROLE_STAFF' && userInfo.users.role !== 'ROLE_ADMIN') {
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
