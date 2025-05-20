import React, { useState } from "react";
import NavigateButton from "../../components/Navigate";

const News = ({ title }) => {
  document.title = title;

  const [news] = useState([
    {
      id: 1,
      title: "Chính sách mới về quy hoạch sử dụng đất đến năm 2030",
      date: "15/03/2024",
      category: "Chính sách",
      content: "Chính phủ vừa ban hành Nghị quyết mới về quy hoạch sử dụng đất quốc gia đến năm 2030, tầm nhìn đến năm 2050. Theo đó, sẽ có những điều chỉnh quan trọng về phân bổ đất đai cho các mục đích phát triển kinh tế - xã hội.",
      image: "https://cdn.thuvienphapluat.vn/uploads/tintuc/2024/10/23/dieu-chinh-quy-hoach-su-dung-dat-quoc-gia.jpg",
      source: "Bộ Tài nguyên và Môi trường"
    },
    {
      id: 2,
      title: "Hà Nội công bố quy hoạch mở rộng đô thị",
      date: "10/03/2024",
      category: "Quy hoạch",
      content: "UBND TP Hà Nội vừa công bố quy hoạch mở rộng đô thị với diện tích 1.000 ha tại huyện Đông Anh. Dự án này sẽ tạo thêm không gian phát triển cho thủ đô trong tương lai.",
      image: "https://ubnd-hanoi.mediacdn.vn/90649499933302784/2025/1/14/b24eff0912feaea0f7ef-1736838403609-17368384050701786027768.jpg",
      source: "UBND TP Hà Nội"
    },
    {
      id: 3,
      title: "Đề xuất sáp nhập một số tỉnh thành phố",
      date: "05/03/2024",
      category: "Hành chính",
      content: "Bộ Nội vụ đang xem xét đề xuất sáp nhập một số tỉnh, thành phố có quy mô dân số nhỏ để tăng hiệu quả quản lý và phát triển kinh tế - xã hội.",
      image: "https://cloudcdnvod.tek4tv.vn/Mam/attach/upload/09032025234718/234721_713653cfe8f159af00e0.jpg",
      source: "Bộ Nội vụ"
    },
    {
      id: 4,
      title: "Cập nhật chính sách đất đai cho doanh nghiệp",
      date: "01/03/2024",
      category: "Doanh nghiệp",
      content: "Chính phủ ban hành Nghị định mới về chính sách đất đai cho doanh nghiệp, tạo điều kiện thuận lợi hơn cho hoạt động đầu tư và phát triển sản xuất.",
      image: "https://cdn.thuvienphapluat.vn/uploads/cong-dong-dan-luat/2023/04/24/chinh-sach-moi-noi-bat-ve-dat-dai-va-thue-co-hieu-luc-tu-thang-5-2023%20.png",
      source: "Bộ Tài chính"
    }
  ]);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body text-center py-4">
              <h1 className="display-4 mb-3">Tin Tức Địa Lý</h1>
              <p className="lead mb-4">
                Cập nhật tin tức mới nhất về chính sách đất đai, quy hoạch và thay đổi hành chính tại Việt Nam
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* News Feed */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Tin tức mới nhất</h4>
              <NavigateButton to="/" className="btn btn-primary">
                <i className="fas fa-home me-2"></i>
                Trang Chủ
              </NavigateButton>
            </div>
            <div className="card-body">
              {news.map((item) => (
                <div key={item.id} className="card mb-4 border-0 shadow-sm">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={item.image}
                        className="img-fluid rounded-start h-100"
                        alt={item.title}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="badge bg-primary">{item.category}</span>
                          <small className="text-muted">{item.date}</small>
                        </div>
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.content}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">Nguồn: {item.source}</small>
                          <button className="btn btn-outline-primary btn-sm">
                            Đọc thêm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Danh mục tin tức</h4>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <div className="card bg-primary text-white">
                    <div className="card-body text-center">
                      <i className="fas fa-landmark fa-2x mb-2"></i>
                      <h5 className="card-title">Chính sách</h5>
                      <p className="card-text">Tin tức về chính sách mới</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-success text-white">
                    <div className="card-body text-center">
                      <i className="fas fa-map-marked-alt fa-2x mb-2"></i>
                      <h5 className="card-title">Quy hoạch</h5>
                      <p className="card-text">Thông tin quy hoạch đô thị</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-info text-white">
                    <div className="card-body text-center">
                      <i className="fas fa-building fa-2x mb-2"></i>
                      <h5 className="card-title">Hành chính</h5>
                      <p className="card-text">Thay đổi địa giới hành chính</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-warning text-white">
                    <div className="card-body text-center">
                      <i className="fas fa-chart-line fa-2x mb-2"></i>
                      <h5 className="card-title">Phát triển</h5>
                      <p className="card-text">Tin tức phát triển kinh tế</p>
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

export default News;
