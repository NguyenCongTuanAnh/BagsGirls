import { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { getToken } from '../helper/UserCurrent';
import AuthAPI from '../AuthAPI';
import { notification } from 'antd';

const validateToken = async (token) => {
  const response = await AuthAPI.validateToken(token);
  return response.data;
};
const AdminAuth = ({ children }) => {
  const [accessChecked, setAccessChecked] = useState(false);
  const token = getToken();
  const userInfo = JSON.parse(localStorage.getItem('usersTokenString'));
  console.log('====================================');
  console.log(userInfo);
  console.log('====================================');
  const navigate = useNavigate();
  useEffect(() => {
    const ischecked = async () => {
      if (token === null) {
        navigate('/login');
      }
      if (userInfo === null) {
        navigate('/login');
      } else {
        if (userInfo.users.role !== 'ROLE_ADMIN') {
          navigate('/unauthorized');
        }
      }
      setAccessChecked(true);
    };
    ischecked();
  }, []);
  if (!accessChecked) {
    return null; // Hoặc có thể return một loading indicator
  }
  return children;
};

export default AdminAuth;
