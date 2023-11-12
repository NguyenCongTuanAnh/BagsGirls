import { useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { getToken } from '../helper/UserCurrent';

const AuthGuard = ({ children }) => {
  const token = getToken();
  console.log(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      window.location.href = 'http://localhost:3000/login';
    }
  });

  return children;
};

export default AuthGuard;
