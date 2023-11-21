import { useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { getToken } from '../helper/UserCurrent';
import AuthAPI from '../AuthAPI';
import { notification } from 'antd';

const validateToken = async (token) => {
  const response = await AuthAPI.validateToken(token);
  return response.data;
};
const AdminAuth = ({ children }) => {
  const token = getToken();
  const userInfo = JSON.parse(localStorage.getItem('usersTokenString'));
  const navigate = useNavigate();
  useEffect(() => {
    if (token === null) {
      navigate('/login');
    }

    // if (validateToken(token) === false) {
    //   console.log('====================================');
    //   console.log(validateToken(token));
    //   console.log('====================================');
    //   notification.error({
    //     message: 'Hết phiên đăng nhập',
    //     description: 'Vui lòng đăng nhập lại!!!!',
    //     duration: 2,
    //   });
    //   navigate('/login');
    // }
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
