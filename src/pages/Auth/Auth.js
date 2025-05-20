import React, { useEffect, useState } from "react";
import { validateUser } from "../../api/authApi";
import Loading from "../../utils/loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavigateButton from "../../components/Navigate";
import "../../assets/vendor/css/core.css";
import "../../assets/vendor/css/theme-default.css";
import "../../assets/css/demo.css";
import "../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../../assets/vendor/css/pages/page-auth.css";

const Login = ({ title }) => {
  const [email, setEmail] = useState(""); // Input field cho email
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(""); // Lỗi validate
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem email và password có trống hay không
    if (!email || !password) {
      setValidationError("Email và mật khẩu là bắt buộc");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email, // Gửi email dưới dạng username
          password,
        }
      );

      // Lưu access token vào localStorage
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem("token_type", response.data.token_type);
      setValidationError(""); // Xóa lỗi validate
      navigate("/"); // Điều hướng tới trang dashboard sau khi đăng nhập thành công
    } catch (error) {
      setValidationError("Thông tin đăng nhập không hợp lệ");
    }
  };

  return (
    <div>
      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className="card px-sm-6 px-0">
              <div className="card-body">
                <h4 className="mb-1">Xin Chào 👋</h4>
                <p className="mb-6">Vui lòng đăng nhập để vào trung tâm</p>

                <form
                  id="formAuthentication"
                  className="mb-6"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-6">
                    <label htmlFor="email" className="form-label">
                      Email or Username
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Nhập email"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="mb-6 form-password-toggle">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <div className="input-group input-group-merge">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                        aria-describedby="password"
                      />
                      <span className="input-group-text cursor-pointer">
                        <i className="bx bx-hide"></i>
                      </span>
                    </div>
                  </div>
                  <div className="mb-8">
                    <div className="d-flex justify-content-between mt-8">
                      <div className="form-check mb-0 ms-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="remember-me"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="remember-me"
                        >
                          {" "}
                          Lưu thông tin{" "}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <button
                      className="btn btn-primary d-grid w-100"
                      type="submit"
                      onClick={() => navigate("/", { replace: true })}
                    >
                      Đăng nhập
                    </button>
                  </div>
                </form>

                {/* Hiển thị lỗi validate nếu có */}
                {validationError && (
                  <p style={{ color: "red" }}>{validationError}</p>
                )}

                <p className="text-center">
                  <span>Chưa có tài khoản đăng nhập?</span>
                  <NavigateButton
                    to="/register"
                    className="btn btn-sm btn-outline-primary"
                  >
                    Đăng ký
                  </NavigateButton>
                </p>
                <NavigateButton
                  to="/forgot-password"
                  className="btn btn-sm btn-outline-primary"
                >
                  Quên mật khẩu?
                </NavigateButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Register = ({ title }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Đặt role mặc định là "user"
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
  }, [title]);

  const handleRegister = async (e) => {
    e.preventDefault(); // Ngăn không reload trang khi submit form
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user`,
        {
          username,
          email,
          password,
          role,
        }
      );

      if (response.status === 201) {
        alert("Đăng ký thành công!");
        navigate("/"); // Điều hướng tới trang đăng nhập
      } else {
        // Nếu status không phải là 201, ném lỗi
        throw new Error("Đã xảy ra lỗi, vui lòng thử lại!");
      }
    } catch (error) {
      // Nhận lỗi trả về từ API trong error.response
      if (error.response) {
        // Lỗi từ phía server (4xx, 5xx)
        setError(error.response.data.error);
      }
    }
  };

  return (
    <div>
      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className="card px-sm-6 px-0">
              <div className="card-body">
                <h4 className="mb-1">Đăng ký ở đây nha 🚀</h4>
                <p className="mb-6">Bây giờ là {new Date().toLocaleString()}</p>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={handleRegister} className="mb-6">
                  <div className="mb-6">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      autoFocus
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-6 form-password-toggle">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <div className="input-group input-group-merge">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                        required
                      />
                      <span className="input-group-text cursor-pointer">
                        <i className="bx bx-hide"></i>
                      </span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <select
                      className="form-control"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="Admin" selected>
                        Admin
                      </option>
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary d-grid w-100"
                  >
                    Đăng ký
                  </button>
                </form>

                <p className="text-center">
                  <span>Đã có tài khoản?</span>
                  <a
                    href="/login"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/login");
                    }}
                  >
                    <span> Đăng nhập</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Forgot = ({ title }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
    const fetchEmployees = async () => {
      try {
        const data = await validateUser();
        setEmployees(data);
        console.log(employees);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleForgot = (e) => {
    e.preventDefault();
    navigate(`/login`);
  };

  if (loading) return <Loading />;
  if (error) return <p>Có lỗi xảy ra: {error}</p>;

  return (
    <div>
      {/* Content */}

      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            {/* Forgot Password */}
            <div className="card px-sm-6 px-0">
              <div className="card-body">
                <h4 className="mb-1">Quên mật khẩu chứ gì? 🔒</h4>
                <p className="mb-6">
                  Có cái mật khẩu củng không giữ được thì làm sao giữ được người
                  yêu lêu lêu
                </p>
                <form
                  onSubmit={handleForgot}
                  id="formAuthentication"
                  className="mb-6"
                  action="index.html"
                >
                  <div className="mb-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      autoFocus
                    />
                  </div>
                  <button className="btn btn-primary d-grid w-100">
                    Send Reset Link
                  </button>
                </form>
                <div className="text-center">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/login`);
                    }}
                    href="/"
                    className="d-flex justify-content-center"
                  >
                    <i className="bx bx-chevron-left scaleX-n1-rtl me-1"></i>
                    Trở về đăng nhập
                  </a>
                </div>
              </div>
            </div>
            {/* Forgot Password */}
          </div>
        </div>
      </div>
    </div>
  );
};
export { Login, Register, Forgot };
