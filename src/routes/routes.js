import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Login, Forgot } from "../pages/Auth/Auth";
// import { UserMe, GetAllUser } from "../pages/User/User";
import Department from "../pages/Departments/Departments";
import Introduce from "../pages/Introduce/Introduce";
import CompareProvinces from "../pages/CompareProvinces/CompareProvinces";
import News from "../pages/News/News";
import Setting from "../pages/Setting/Setting";
// import EmployeeList from "../pages/Employees/EmployeeList";
import Dashboard from "../pages/Dashboard/Dashboard";
import Logout from "../pages/Auth/Logout";
import ProtectedRoute from "../components/ProtectedRoute";
import Loading from "../utils/loading";
import { cloneElement, useEffect, useState } from "react";
import { USER_VERVICE } from "../api/userService";

// Helper to wrap protected routes
const Protected = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

const ProtectedLogin = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataUser, setDataUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const process = async () => {
      const data = await USER_VERVICE.getUserByUserName();
      if (data.isSuccess) {
        setDataUser(data.data);
        setIsLoading(false);
      } else {
        alert(data.errorMessage);
        navigate("/login");
      }
    }

    process();

  }, []);


  if (isLoading) return <Loading />

  return dataUser
    ? cloneElement(children, { dataUser })
    : null;
}

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Dashboard title="Bản đồ Việt Nam" />} />
      <Route
        path="/forgot-password"
        element={<Forgot title="Quên mật khẩu" />}
      />

      {/* Protected Routes */}
      <Route
        path="/login"
        element={<Login title="Đăng Nhập" />}
      />
      <Route
        path="/introduce"
        element={
          <Protected>
            <Introduce title="Giới thiệu đồ án" />
          </Protected>
        }
      />
      <Route
        path="/so-sanh-tinh-thanh"
        element={
          <Protected>
            <CompareProvinces title="So sánh tỉnh thành" />
          </Protected>
        }
      />
      <Route
        path="/tin-tuc"
        element={<News title="Tin tức địa lý" />}
      />
      <Route
        path="/cai-dat"
        element={<Setting title="Cài đặt hệ thống" />}
      />

      {/* Page need to login */}
      <Route
        path="/logout"
        element={
          <Protected>
            <Logout title="Đăng xuất" />
          </Protected>
        }
      />
      <Route
        path="/nhap-du-lieu-tinh"
        element={
          <ProtectedLogin>
            <Department title="Nhập dữ liệu tỉnh" />
          </ProtectedLogin>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
