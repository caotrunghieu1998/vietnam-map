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
import { USER_VERVICE } from "../../services/userService";

const Login = ({ title }) => {
  const [userName, setUserName] = useState(""); // Input field cho email
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(""); // Lỗi validate
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setValidationError("Email và mật khẩu là bắt buộc");
      return;
    }

    const dataLogin = await USER_VERVICE.userLogin({ username: userName, password: password });

    if (dataLogin.isSuccess && dataLogin.data) {
      alert(`Xin chào "${dataLogin.data.USERNAME}"`);
      localStorage.setItem("username", dataLogin.data.USERNAME);
      navigate("/nhap-du-chi-so-gia-hoa");
    } else {
      setValidationError(dataLogin.errorMessage);
    }
  };

  useEffect(() => { 
    document.title = title;
  }, []);

  return (
    <div>
      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className="card px-sm-6 px-0">
              <div className="card-body">
                <h4 className="mb-1">Xin Chào 👋</h4>
                <p className="mb-6">Vui lòng đăng nhập vào tài khoản admin</p>

                <form
                  id="formAuthentication"
                  className="mb-6"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-6">
                    <label htmlFor="userName" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Nhập userName"
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
                      // onClick={() => navigate("/", { replace: true })}
                    >
                      Đăng nhập
                    </button>
                  </div>
                </form>

                {/* Hiển thị lỗi validate nếu có */}
                {!!validationError && (
                  <p style={{ color: "red" }}>{validationError}</p>
                )}

                {/* <NavigateButton
                  to="/forgot-password"
                  className="btn btn-sm btn-outline-primary"
                >
                  Quên mật khẩu?
                </NavigateButton> */}
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
                <h4 className="mb-1">Quên mật khẩu? 🔒</h4>
                <p className="mb-6">
                  Nhập thông tin để tiến thành lấy lại mật khẩu
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
export { Login, Forgot };
