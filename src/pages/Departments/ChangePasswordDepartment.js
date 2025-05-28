import React, { useState } from "react";
import NavigateButton from "../../components/Navigate";
import { toast } from "react-toastify";
import NavigateMenu from "./NavigateMenu";
import { USER_VERVICE } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const ChangePasswordDepartment = ({ 
  title, 
  dataUser,
  setRefreshData,
  setLoadding,
}) => {
  document.title = title;
  const [password_new, set_password_new] = useState("");
  const [password_old, set_password_old] = useState("");
  const [re_password_new, set_re_password_new] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadding(true);

    const {
      success,
      message,
    } = await USER_VERVICE.userChangePassword({
      password_old,
      password_new,
      re_password_new,
      username: dataUser.username,
    });

    console.log('3123213213', {success,
message})

    if (success) {
      toast.success(message);
      setRefreshData(Date.now());
      toast.success(message);
      alert("Xin hãy đăng nhập lại");
      navigate("/logout");
    } else {
      toast.error(message);
    }
    setLoadding(false);
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y bg-transparent">
      <div className="row">
        <div className="col-xl">
          <div className="card mb-4">
            <NavigateMenu />
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Đổi mật khẩu</h5>
              <NavigateButton to="/" className="btn btn-dark">
                Trang Chủ
              </NavigateButton>
              <NavigateButton to="/logout" className="btn btn-light">
                Logout
              </NavigateButton>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor="department-password_old">
                      Mật khẩu cũ
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="department-password_old"
                      className="form-control"
                      value={password_old}
                      onChange={(e) => set_password_old(e.target.value)}
                      placeholder="Nhập mật khẩu cũ"
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor="department-password_new">
                      Mật khẩu mới
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="department-password_new"
                      className="form-control"
                      value={password_new}
                      onChange={(e) => set_password_new(e.target.value)}
                      placeholder="Nhập mật khẩu mới"
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor="department-password_new">
                      Nhập lại Mật khẩu mới
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="department-password_new"
                      className="form-control"
                      value={re_password_new}
                      onChange={(e) => set_re_password_new(e.target.value)}
                      placeholder="Nhập lại Mật khẩu mới"
                      required
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="btn btn-light" style={{marginLeft: '8px'}} onClick={(e) => {
                    setShowPassword(!showPassword)
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={20}>
                      {/*!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
                      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-3">
                  <button type="submit" className="btn btn-primary">Cập nhật</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordDepartment;
