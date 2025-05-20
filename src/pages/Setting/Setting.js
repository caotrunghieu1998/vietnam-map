import React, { useState } from "react";
import NavigateButton from "../../components/Navigate";

const Setting = ({ title }) => {
  document.title = title;
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Cài đặt hệ thống</h4>
              <div className="btn-group">
                <button className="btn btn-primary">
                  <i className="fas fa-save me-2"></i>
                  Lưu thay đổi
                </button>
                <NavigateButton to="/" className="btn btn-dark">
                Trang Chủ
                </NavigateButton>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                {/* Sidebar Navigation */}
                <div className="col-md-3">
                  <div className="nav flex-column nav-pills" role="tablist">
                    <button
                      className={`nav-link ${activeTab === 'general' ? 'active' : ''} mb-2`}
                      onClick={() => setActiveTab('general')}
                    >
                      <i className="fas fa-cog me-2"></i>
                      Cài đặt chung
                    </button>
                    <button
                      className={`nav-link ${activeTab === 'map' ? 'active' : ''} mb-2`}
                      onClick={() => setActiveTab('map')}
                    >
                      <i className="fas fa-map-marked-alt me-2"></i>
                      Cài đặt bản đồ
                    </button>
                    <button
                      className={`nav-link ${activeTab === 'data' ? 'active' : ''} mb-2`}
                      onClick={() => setActiveTab('data')}
                    >
                      <i className="fas fa-database me-2"></i>
                      Quản lý dữ liệu
                    </button>
                    <button
                      className={`nav-link ${activeTab === 'notification' ? 'active' : ''} mb-2`}
                      onClick={() => setActiveTab('notification')}
                    >
                      <i className="fas fa-bell me-2"></i>
                      Thông báo
                    </button>
                    <button
                      className={`nav-link ${activeTab === 'account' ? 'active' : ''} mb-2`}
                      onClick={() => setActiveTab('account')}
                    >
                      <i className="fas fa-user-cog me-2"></i>
                      Tài khoản
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="col-md-9">
                  <div className="tab-content">
                    {/* General Settings */}
                    {activeTab === 'general' && (
                      <div className="tab-pane fade show active">
                        <h5 className="mb-4">Cài đặt chung</h5>
                        <div className="mb-3">
                          <label className="form-label">Ngôn ngữ</label>
                          <select className="form-select">
                            <option value="vi">Tiếng Việt</option>
                            <option value="en">English</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Múi giờ</label>
                          <select className="form-select">
                            <option value="asia/hanoi">(GMT+7) Hà Nội</option>
                            <option value="asia/ho_chi_minh">(GMT+7) TP. Hồ Chí Minh</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Định dạng ngày tháng</label>
                          <select className="form-select">
                            <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                            <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                            <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Map Settings */}
                    {activeTab === 'map' && (
                      <div className="tab-pane fade show active">
                        <h5 className="mb-4">Cài đặt bản đồ</h5>
                        <div className="mb-3">
                          <label className="form-label">Kiểu bản đồ</label>
                          <select className="form-select">
                            <option value="standard">Tiêu chuẩn</option>
                            <option value="satellite">Vệ tinh</option>
                            <option value="terrain">Địa hình</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Mức độ zoom mặc định</label>
                          <input type="range" className="form-range" min="1" max="10" defaultValue="5" />
                        </div>
                        <div className="mb-3">
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="showLabels" defaultChecked />
                            <label className="form-check-label" htmlFor="showLabels">Hiển thị nhãn tỉnh thành</label>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="showMarkers" defaultChecked />
                            <label className="form-check-label" htmlFor="showMarkers">Hiển thị điểm đánh dấu</label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Data Management Settings */}
                    {activeTab === 'data' && (
                      <div className="tab-pane fade show active">
                        <h5 className="mb-4">Quản lý dữ liệu</h5>
                        <div className="mb-3">
                          <label className="form-label">Tần suất cập nhật dữ liệu</label>
                          <select className="form-select">
                            <option value="daily">Hàng ngày</option>
                            <option value="weekly">Hàng tuần</option>
                            <option value="monthly">Hàng tháng</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="autoBackup" defaultChecked />
                            <label className="form-check-label" htmlFor="autoBackup">Tự động sao lưu dữ liệu</label>
                          </div>
                        </div>
                        <div className="mb-3">
                          <button className="btn btn-outline-primary">
                            <i className="fas fa-download me-2"></i>
                            Xuất dữ liệu
                          </button>
                          <button className="btn btn-outline-secondary ms-2">
                            <i className="fas fa-upload me-2"></i>
                            Nhập dữ liệu
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Notification Settings */}
                    {activeTab === 'notification' && (
                      <div className="tab-pane fade show active">
                        <h5 className="mb-4">Cài đặt thông báo</h5>
                        <div className="mb-3">
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="emailNotif" defaultChecked />
                            <label className="form-check-label" htmlFor="emailNotif">Thông báo qua email</label>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="browserNotif" defaultChecked />
                            <label className="form-check-label" htmlFor="browserNotif">Thông báo trình duyệt</label>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Loại thông báo</label>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="dataUpdate" defaultChecked />
                            <label className="form-check-label" htmlFor="dataUpdate">Cập nhật dữ liệu</label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="systemAlert" defaultChecked />
                            <label className="form-check-label" htmlFor="systemAlert">Cảnh báo hệ thống</label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Account Settings */}
                    {activeTab === 'account' && (
                      <div className="tab-pane fade show active">
                        <h5 className="mb-4">Cài đặt tài khoản</h5>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input type="email" className="form-control" defaultValue="user@example.com" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Mật khẩu hiện tại</label>
                          <input type="password" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Mật khẩu mới</label>
                          <input type="password" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Xác nhận mật khẩu mới</label>
                          <input type="password" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="twoFactor" />
                            <label className="form-check-label" htmlFor="twoFactor">Bật xác thực hai yếu tố</label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
