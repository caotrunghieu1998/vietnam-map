// import React from "react";
// import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // const token = localStorage.getItem("access_token");

  // Nếu không có token, điều hướng tới trang đăng nhập
  // if (!token) {
  //   return <Navigate to="/" replace />;
  // }

  // Nếu có token, render nội dung con
  return children;
};

export default ProtectedRoute;
