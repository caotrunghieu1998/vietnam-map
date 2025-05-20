import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register, Forgot } from "../pages/Auth/Auth";
// import { UserMe, GetAllUser } from "../pages/User/User";
// import PostDepartment from "../pages/Departments/Departments";
// import GetDepartments from "../pages/Departments/GetDepartments";
// import FetchPositions from "../pages/Positions/Positions";
// import CreatePositionForm from "../pages/Positions/AddPositions";
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
      
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
