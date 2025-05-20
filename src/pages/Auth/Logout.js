import { useNavigate } from "react-router-dom";
import { USER_VERVICE } from "../../api/userService";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await USER_VERVICE.userLogout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <>Please wait ...</>;
};

export default Logout;
