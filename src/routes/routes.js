import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register, Forgot } from "../pages/Auth/Auth";
// import { UserMe, GetAllUser } from "../pages/User/User";
import Department from "../pages/Departments/Departments";
import Introduce from "../pages/Introduce/Introduce";
import CompareProvinces from "../pages/CompareProvinces/CompareProvinces";
import News from "../pages/News/News";
// import CreateEmployee from "../pages/Employees/AddEmployee";
// import EmployeeList from "../pages/Employees/EmployeeList";
import Dashboard from "../pages/Dashboard/Dashboard";
import Logout from "../pages/Auth/Logout";
import ProtectedRoute from "../components/ProtectedRoute";

// Helper to wrap protected routes
const Protected = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Dashboard title="Bản đồ Việt Nam" />} />
      <Route path="/register" element={<Register title="Đăng Ký" />} />
      <Route
        path="/forgot-password"
        element={<Forgot title="Quên mật khẩu" />}
      />

      {/* Protected Routes */}
      <Route
        path="/logout"
        element={
          <Protected>
            <Logout title="Đăng xuất" />
          </Protected>
        }
      />
      <Route
        path="/login"
        element={
          <Protected>
            <Login title="Đăng Nhập" />
          </Protected>
        }
      />
      <Route
        path="/nhap-du-lieu-tinh"
        element={
          <Protected>
            <Department title="Nhập dữ liệu tỉnh" />
          </Protected>
        }
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
    </Routes>
    <Routes>
      <Route
        path="/tin-tuc"
        element={<News title="Tin tức địa lý" />}
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
