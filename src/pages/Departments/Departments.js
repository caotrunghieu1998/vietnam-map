import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigateButton from "../../components/Navigate";
import { DEPARTMENRS_VERVICE } from "../../services/departmentsService";
import Loading from "../../utils/loading";

const Department = ({ title, dataUser }) => {
  document.title = title;
  const [departmentName, setDepartmentName] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [departments, setDepartments] = useState([]);
  const [isGettingData, setIsGettingData] = useState(false); 
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const [tenTinh, setTenTinh] = useState("");
  const [tuoiThoTrungBinh, setTuoiThoTrungBinh] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDepartment = {
      id: departments.length + 1,
      department_name: departmentName,
      year: parseInt(year),
      location: parseInt(location),
      population: parseInt(location),
      area: Math.random() * 2000 + 1000,
      gdp: Math.random() * 20 + 30
    };

    if (editingId) {
      // Update existing department
      setDepartments(departments.map(dept => 
        dept.id === editingId ? { ...dept, ...newDepartment } : dept
      ));
      setEditingId(null);
    } else {
      // Add new department
      setDepartments([...departments, newDepartment]);
    }

    // Reset form
    setDepartmentName("");
    setLocation("");
    setYear("");
    setTenTinh("");
    setTuoiThoTrungBinh("");
  };

  const handleEdit = (department) => {
    setTenTinh(department.province_name);
    setTuoiThoTrungBinh(department.tuoi_tho_trung_binh);
    setEditingId(department.province_code);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tỉnh này?")) {
      setDepartments(departments.filter(dept => dept.id !== id));
    }
  };

  useEffect(() => {
    const getData = async () => {
      setIsGettingData(true);
      const data = await DEPARTMENRS_VERVICE.getAllData();
      if (data.errorMessage) {
        alert(data.errorMessage);
        navigate('/');
      } else {
        setDepartments(data.data);
      }
      setIsGettingData(false);
    }
    getData();
  }, [])

  if (isGettingData) return <Loading />

  return (
    <div className="container-xxl flex-grow-1 container-p-y bg-transparent">
      <div className="row">
        <div className="col-xl">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Nhập dữ liệu tỉnh</h5>
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
                      Tên tỉnh
                    </label>
                    <input
                      type="text"
                      id="department-name"
                      className="form-control"
                      value={tenTinh}
                      onChange={(e) => setTenTinh(e.target.value)}
                      placeholder="Nhập tên tỉnh"
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor="year">
                      Tuổi thọ trung bình
                    </label>
                    <input
                      type="number"
                      id="year"
                      className="form-control"
                      value={tuoiThoTrungBinh}
                      onChange={(e) => setTuoiThoTrungBinh(e.target.value)}
                      placeholder="Nhập năm"
                      required
                    />
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
                        setDepartmentName("");
                        setLocation("");
                        setYear("");
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
              <h5 className="mb-0">Danh sách tỉnh</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>STT</th>
                      <th>Tên tỉnh</th>
                      <th>Năm</th>
                      <th>Tuổi thọ trung bình</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((department, index) => (
                      <tr key={department.province_code}>
                        <td>{index + 1}</td>
                        <td>{department.province_name}</td>
                        <td>{department.nam}</td>
                        <td>{department.tuoi_tho_trung_binh}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(department)}
                          >
                            <i className="fas fa-edit me-1"></i>
                            Sửa
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(department.id)}
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

export default Department;
