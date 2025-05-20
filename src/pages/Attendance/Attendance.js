import React, { useEffect, useState } from "react";
import { fetchData } from "../../components/fetchData";

const Attendance = ({ title }) => {
  const [employee, setEmployee] = useState(null); // Lưu thông tin nhân viên
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    document.title = title;

    const getData = async () => {
      try {
        const data = await fetchData(`${process.env.REACT_APP_API_URL}/user/me`);
        setEmployee(data.data); // Cập nhật dữ liệu
        setLoading(false); // Tắt trạng thái loading
      } catch (err) {
        setError("Không thể lấy dữ liệu nhân viên.");
        setLoading(false); // Tắt trạng thái loading
      }
    };

    getData();
  }, [title]);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      
      <h2>Thông tin chi tiết của bạn</h2>
      {employee ? (
        <div>
          <p>
            <strong>Họ tên:</strong> {employee.username}
          </p>
          <p>
            <strong>Email:</strong> {employee.email}
          </p>
          <p>
            <strong>Vai trò:</strong> {employee.role}
          </p>
          <p>
            <strong>Ngày tạo:</strong>{" "}
            {new Date(employee.created_at).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Không tìm thấy nhân viên.</p>
      )}
    </div>
  );
};


const GetAttendance = ({ title }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    document.title = title;

    const getData = async () => {
      try {
        const data = await fetchData(
          `${process.env.REACT_APP_API_URL}/user/all`
        );
        setEmployees(data.data); // Cập nhật dữ liệu
        setLoading(false); // Tắt trạng thái loading
      } catch (err) {
        setError("Không thể lấy dữ liệu nhân viên.");
        setLoading(false); // Tắt trạng thái loading
      }
    };

    getData();
  }, [title]);


  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {employees.map((employee) => (
          <li>
            {employee.name} - {employee.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export {Attendance,GetAttendance};
