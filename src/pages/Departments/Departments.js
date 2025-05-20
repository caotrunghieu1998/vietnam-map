import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigateButton from "../../components/Navigate";

const Department = ({ title }) => {
  document.title = title;
  const [departmentName, setDepartmentName] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [departments, setDepartments] = useState([
    {
      id: 1,
      department_name: "Hà Nội",
      year: 2024,
      location: 8500000,
      population: 8500000,
      area: 3358.6,
      gdp: 46.5
    },
    {
      id: 2,
      department_name: "TP. Hồ Chí Minh",
      year: 2024,
      location: 9500000,
      population: 9500000,
      area: 2095.6,
      gdp: 52.3
    },
    {
      id: 3,
      department_name: "Đà Nẵng",
      year: 2024,
      location: 1200000,
      population: 1200000,
      area: 1285.4,
      gdp: 38.7
    },
    {
      id: 4,
      department_name: "Cần Thơ",
      year: 2024,
      location: 1500000,
      population: 1500000,
      area: 1439.2,
      gdp: 35.2
    },
    {
      id: 5,
      department_name: "Hải Phòng",
      year: 2024,
      location: 2100000,
      population: 2100000,
      area: 1522.5,
      gdp: 42.1
    }
  ]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

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
  };

  const handleEdit = (department) => {
    setDepartmentName(department.department_name);
    setLocation(department.location.toString());
    setYear(department.year.toString());
    setEditingId(department.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tỉnh này?")) {
      setDepartments(departments.filter(dept => dept.id !== id));
    }
  };

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
                      value={departmentName}
                      onChange={(e) => setDepartmentName(e.target.value)}
                      placeholder="Nhập tên tỉnh"
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor="year">
                      Năm
                    </label>
                    <input
                      type="number"
                      id="year"
                      className="form-control"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="Nhập năm"
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor="target">
                      Dân số
                    </label>
                    <input
                      type="number"
                      id="target"
                      className="form-control"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Nhập dân số"
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
                      <th>Dân số</th>
                      <th>Diện tích (km²)</th>
                      <th>GRDP (triệu đồng)</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((department, index) => (
                      <tr key={department.id}>
                        <td>{index + 1}</td>
                        <td>{department.department_name}</td>
                        <td>{department.year}</td>
                        <td>{department.population.toLocaleString()}</td>
                        <td>{department.area.toFixed(1)}</td>
                        <td>{department.gdp.toFixed(1)}</td>
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
