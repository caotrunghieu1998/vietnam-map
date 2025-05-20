import React from "react";
import NavigateButton from "../../components/Navigate";

const Introduce = ({ title }) => {
  document.title = title;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body text-center py-5">
              <h1 className="display-4 mb-3">HỆ THỐNG ĐỊA LÝ</h1>
              <p className="lead mb-4">
                Hệ thống quản lý và phân tích dữ liệu địa lý Việt Nam
              </p>
              <NavigateButton to="/" className="btn btn-primary">
                <i className="fas fa-map-marked-alt me-2"></i>
                Khám phá ngay
              </NavigateButton>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Tính năng chính</h4>
            </div>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="flex-shrink-0">
                      <i className="fas fa-map-marked-alt fa-2x text-primary"></i>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-1">Bản đồ tương tác</h5>
                      <p className="mb-0">Khám phá bản đồ Việt Nam với khả năng tương tác và hiển thị thông tin chi tiết về từng tỉnh thành.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="flex-shrink-0">
                      <i className="fas fa-chart-line fa-2x text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-1">Phân tích dữ liệu</h5>
                      <p className="mb-0">Theo dõi và phân tích các chỉ số quan trọng như dân số, chỉ số già hóa qua các năm.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="flex-shrink-0">
                      <i className="fas fa-database fa-2x text-info"></i>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-1">Quản lý dữ liệu</h5>
                      <p className="mb-0">Hệ thống quản lý dữ liệu hiệu quả với khả năng thêm, sửa, xóa thông tin tỉnh thành.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header">
              <h4 className="mb-0">Mục tiêu đồ án</h4>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Xây dựng hệ thống quản lý dữ liệu địa lý Việt Nam
                </li>
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Phân tích và hiển thị dữ liệu thống kê trực quan
                </li>
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Cung cấp công cụ tìm kiếm và tương tác với bản đồ
                </li>
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Theo dõi và đánh giá các chỉ số phát triển theo thời gian
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header">
              <h4 className="mb-0">Công nghệ sử dụng</h4>
            </div>
            <div className="card-body">
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-primary">React</span>
                <span className="badge bg-warning">Python Flask</span>
                <span className="badge bg-danger">Chart.js</span>
                <span className="badge bg-secondary">React Simple Maps</span>
                <span className="badge bg-dark">Tailwind CSS</span>
                <span className="badge bg-primary">Axios</span>
                <span className="badge bg-success">D3.js</span>
                <span className="badge bg-info">MySQL DB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Nhóm thực hiện</h4>
            </div>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card border shadow-none">
                    <div className="card-body text-center">
                      <div className="mb-3">
                        <i className="fas fa-user-circle fa-4x text-primary"></i>
                      </div>
                      <h5 className="mb-1">Cao Trung Hiếu</h5>
                      <p className="text-muted mb-2">MSSV: 23410154</p>
                      <p className="mb-0">Frontend Developer</p>
                    </div>
                    <div className="card-body text-center">
                      <div className="mb-3">
                        <i className="fas fa-user-circle fa-4x text-primary"></i>
                      </div>
                      <h5 className="mb-1">Mai Văn Quân</h5>
                      <p className="text-muted mb-2">MSSV: 23410179</p>
                      <p className="mb-0">Frontend Developer</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border shadow-none">
                    <div className="card-body text-center">
                      <div className="mb-3">
                        <i className="fas fa-user-circle fa-4x text-success"></i>
                      </div>
                      <h5 className="mb-1">Cao Thanh Lâm</h5>
                      <p className="text-muted mb-2">MSSV: 23410165</p>
                      <p className="mb-0">Backend Developer</p>
                    </div>
                    <div className="card-body text-center">
                      <div className="mb-3">
                        <i className="fas fa-user-circle fa-4x text-success"></i>
                      </div>
                      <h5 className="mb-1">Võ Hững Thông</h5>
                      <p className="text-muted mb-2">MSSV: 23410197</p>
                      <p className="mb-0">Backend Developer</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border shadow-none">
                    <div className="card-body text-center">
                      <div className="mb-3">
                        <i className="fas fa-user-circle fa-4x text-info"></i>
                      </div>
                      <h5 className="mb-1">Nguyễn Duy Đạt</h5>
                      <p className="text-muted mb-2">MSSV: 23410149</p>
                      <p className="mb-0"> Business Analyst, UI/UX Designer</p>
                    </div>
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

export default Introduce;
