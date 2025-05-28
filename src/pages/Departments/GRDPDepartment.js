import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigateButton from "../../components/Navigate";
import { toast } from "react-toastify";
import NavigateMenu from "./NavigateMenu";
import { GRDPService } from "../../services/GRDPService";

const GRDPDepartment = ({ 
  title, 
  dataUser,
  dataGRDPS = [],
  dataProvince = [],
  unitObject={},
  setRefreshData,
  setLoadding,
}) => {
  document.title = title;
  const [dataSelected, setDataSelected] = useState({
    "create_by": "",
    "update_by": "",
    "id": "",
    "growth_rate": "",
    "info_year": "",
    "province_code": ""
  });

  const [dataGRDPSConvert, setDataGRDPSConvert] = useState({});

  useEffect(() => {
    const data = {};
    dataGRDPS.forEach((item, index) => {
      if (!data[item.info_year]) data[item.info_year] = [];
      data[item.info_year].push({
        ...item,
        unit_name: unitObject[item.unit_code],
        province_name: dataProvince.find(pro => pro.province_code === item.province_code)?.province_name || '',
        indexBase: index,
      });
    });
    setDataGRDPSConvert(data);
  }, [dataGRDPS]);

  const [currentTabYear, setCurrentTabYear] = useState(0);

  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadding(true);

    dataSelected.update_by = dataUser.username;
    dataSelected.create_by = dataUser.username;



    if (editingId) {
      const {
        success,
        message,
      } = await GRDPService.update(dataSelected);
      if (success) {
        toast.success(message);
        setRefreshData(Date.now());
        dataSelected.create_by = "";
        dataSelected.update_by = "";
        dataSelected.id = "";
        dataSelected.growth_rate = "";
        dataSelected.info_year = "";
        dataSelected.province_code = "";
        setDataSelected({...dataSelected});
        setEditingId(null);
      } else {
        toast.error(message);
      }
    } else {
      const {
        success,
        message,
      } = await GRDPService.create(dataSelected);
      if (success) {
        toast.success(message);
        setRefreshData(Date.now());
        dataSelected.create_by = "";
        dataSelected.update_by = "";
        dataSelected.id = "";
        dataSelected.growth_rate = "";
        dataSelected.info_year = "";
        dataSelected.province_code = "";
        setDataSelected({...dataSelected});
      } else {
        toast.error(message);
      }
    }
    setLoadding(false);
  };

  const handleEdit = (department) => {
    dataSelected.growth_rate = department.growth_rate;
    dataSelected.info_year = department.info_year;
    dataSelected.province_code = department.province_code;
    dataSelected.id = department.id;
    setDataSelected({...dataSelected});
    setEditingId(department.id);
  };

  const handleDelete = async (data) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tỉnh này?")) {
      setLoadding(true);
      const {
        success,
        message,
      } = await GRDPService.delete(data);
      if (success) {
        toast.success(message);
        setRefreshData(Date.now());
        setEditingId(null);
      } else {
        toast.error(message);
      }
      setLoadding(false);
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y bg-transparent">
      <div className="row">
        <div className="col-xl">
          <div className="card mb-4">
            <NavigateMenu />
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Nhập liệu GRDP</h5>
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
                    <label className="form-label" htmlFor="department-name">
                      Năm
                    </label>
                    <input
                      type="text"
                      id="department-name"
                      className="form-control"
                      value={dataSelected.info_year}
                      disabled={editingId}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        dataSelected.info_year = newValue;
                        setDataSelected({...dataSelected});
                      }}
                      placeholder="Nhập số năm"
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor="year">
                      Thông số
                    </label>
                    <input
                      type="number"
                      id="year"
                      className="form-control"
                      value={dataSelected.growth_rate}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        dataSelected.growth_rate = newValue;
                        setDataSelected({...dataSelected});
                      }}
                      placeholder="Nhập thông số"
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor="ten-tinh">
                      Tên tỉnh
                    </label>
                    <select className="form-select" value={dataSelected.province_code} onChange={e => {
                      dataSelected.province_code = e.target.value;
                      setDataSelected({...dataSelected});
                    }}
                    disabled={editingId}
                    >
                      <option value="">Chọn tỉnh</option>
                      {
                        dataProvince.map(item => <option key={item.province_code} value={item.province_code}>{item.province_name}</option>)
                      }
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <button type="submit" className="btn btn-primary">
                    {editingId ? "Cập nhật" : "Thêm mới"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={() => {
                        setEditingId(null);
                        // setDepartmentName("");
                        // setLocation("");
                        // setYear("");
                        dataSelected.create_by = "";
                        dataSelected.update_by = "";
                        dataSelected.growth_rate = "";
                        dataSelected.province_code = "";
                        dataSelected.info_year = "";
                        dataSelected.id = "";
                        setDataSelected({...dataSelected});
                      }}
                    >
                      Hủy
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Table to display departments */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Danh sách</h5>
            </div>
            <div className="card-body">
              <div className="year-option">
                {
                  Object.keys(dataGRDPSConvert).map((key, index) => 
                    <div 
                      key={index} 
                      className={`year-item ${currentTabYear === index ? 'active' : ''}`}
                      onClick={() => setCurrentTabYear(index)}
                    >{key}</div>
                  )
                }
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>STT</th>
                      <th>Tên tỉnh</th>
                      <th>Năm</th>
                      <th>Thông số</th>
                      <th>Đơn vị</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(dataGRDPSConvert[Object.keys(dataGRDPSConvert)[currentTabYear]] || []).map((data, index) => (
                      <tr key={data.id}>
                        <td>{index + 1}</td>
                        <td>{data.province_name || ''}</td>
                        <td>{data.info_year}</td>
                        <td>{data.growth_rate}</td>
                        <td>{data.unit_name}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(data)}
                          >
                            <i className="fas fa-edit me-1"></i>
                            Sửa
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(data)}
                          >
                            <i className="fas fa-trash me-1"></i>
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GRDPDepartment;
