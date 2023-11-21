import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../helper/UserCurrent";
import { jwtDecode } from "jwt-decode";

const GuestGuard = ({ children }) => {
  const userToken = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken === "undefined" || userToken === null) {
      return children;
    }

    const decodedToken = jwtDecode(userToken)
    console.log(decodedToken);
    const currentTime = Date.now();
    if (decodedToken.exp * 1000 > currentTime) {
      navigate("/");
    }
  }, []);

  return children;
};

export default GuestGuard;