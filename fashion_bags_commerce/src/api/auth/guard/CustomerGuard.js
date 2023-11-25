import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStaffToken } from '../helper/UserCurrent';
import { jwtDecode } from 'jwt-decode';

const CustomerGuard = ({ children }) => {
  const customerToken = getStaffToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (customerToken === 'undefined' || customerToken === null) {
      return children;
    }

    const decodedToken = jwtDecode(customerToken);
    console.log(decodedToken);
    const currentTime = Date.now();
    if (decodedToken.exp * 1000 > currentTime) {
      navigate('/');
    }
  }, []);

  return children;
};

export default CustomerGuard;
