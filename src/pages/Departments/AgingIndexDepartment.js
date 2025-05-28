import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigateButton from "../../components/Navigate";
import { DEPARTMENRS_VERVICE } from "../../services/departmentsService";
import Loading from "../../utils/loading";
import { AgingIndexService } from "../../services/AgingIndexService";
import { toast } from "react-toastify";

const AgingIndexDepartment = ({ 
  title, 
  dataUser,
  dataAgingIndex = [],
  dataProvince = [],
  unitObject={},
  setRefreshData,
  setLoadding,
}) => {
  document.title = title;
  const [dataSelected, setDataSelected] = useState({
    "create_by": "",
    "update_by": "",
    "info_quantity": "",
    "info_year": "",
    "province_code": ""
  });

  const [dataAgingIndexConvert, setDataAgingIndexConvert] = useState({});

  useEffect(() => {
    const data = {};
    dataAgingIndex.forEach((item, index) => {
      if (!data[item.info_year]) data[item.info_year] = [];
      data[item.info_year].push({
        ...item,
        unit_name: unitObject[item.unit_code],
        province_name: dataProvince.find(pro => pro.province_code === item.province_code)?.province_name || '',
        indexBase: index,
      });
    });
    setDataAgingIndexConvert(data);
  }, [dataAgingIndex]);

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
      } = await AgingIndexService.update(dataSelected);
      if (success) {
        toast.success(message);
        setRefreshData(Date.now());
        dataSelected.create_by = "";
        dataSelected.update_by = "";
        dataSelected.info_quantity = "";
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
      } = await AgingIndexService.create(dataSelected);
      if (success) {
        toast.success(message);
        setRefreshData(Date.now());
        dataSelected.create_by = "";
        dataSelected.update_by = "";
        dataSelected.info_quantity = "";
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
    dataSelected.info_quantity = department.info_quantity;
    dataSelected.info_year = department.info_year;
    dataSelected.province_code = department.province_code;
    setDataSelected({...dataSelected});
    setEditingId(department.id);
  };

  const handleDelete = async (data) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tỉnh này?")) {
      setLoadding(true);
      const {
        success,
        message,
      } = await AgingIndexService.delete(data);
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
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Nhập dữ liệu chỉ số già hóa</h5>
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
                      value={dataSelected.info_quantity}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        dataSelected.info_quantity = newValue;
                        setDataSelected({...dataSelected});
                      }}
                      placeholder="Nhập thông số già hóa"
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
                        dataSelected.info_quantity = "";
                        dataSelected.province_code = "";
                        dataSelected.info_year = "";
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
              <h5 className="mb-0">Danh sách chỉ số già hóa</h5>
            </div>
            <div className="card-body">
              <div className="year-option">
                {
                  Object.keys(dataAgingIndexConvert).map((key, index) => 
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
                    {(dataAgingIndexConvert[Object.keys(dataAgingIndexConvert)[currentTabYear]] || []).map((data, index) => (
                      <tr key={data.id}>
                        <td>{index + 1}</td>
                        <td>{data.province_name || ''}</td>
                        <td>{data.info_year}</td>
                        <td>{data.info_quantity}</td>
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

export default AgingIndexDepartment;
