import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("access_token");

      // Perform the POST request to logout
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/logout?token=${token}`, // The backend URL for the logout endpoint
        {}, // Send empty body for logout
        {
          headers: {
            accept: "application/json", // Ensure the response is in JSON
          },
        }
      );

      // Clear tokens from localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("token_type");

      // Redirect to home page after logout
      navigate("/", { replace: true });

      return response.data; // Return the response data
    } catch (error) {
      console.error("Logout failed:", error);
      throw error; // Re-throw the error for further handling
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
