import React, { useState, useEffect } from "react";
import NavigateButton from "../../components/Navigate";
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CompareProvinces = ({ title }) => {
  document.title = title;
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince1, setSelectedProvince1] = useState("");
  const [selectedProvince2, setSelectedProvince2] = useState("");
  const [comparisonData, setComparisonData] = useState(null);

  // Mock data for provinces - replace with actual API call
  useEffect(() => {
    setProvinces([
      { id: 1, name: "Hà Nội" },
      { id: 2, name: "TP. Hồ Chí Minh" },
      { id: 3, name: "Đà Nẵng" },
      { id: 4, name: "Cần Thơ" },
      { id: 5, name: "Hải Phòng" },
    ]);
  }, []);

  // Mock data for comparison - replace with actual API call
  const handleCompare = () => {
    if (selectedProvince1 && selectedProvince2) {
      setComparisonData({
        population: {
          labels: ['2019', '2020', '2021', '2022', '2023'],
          datasets: [
            {
              label: provinces.find(p => p.id === parseInt(selectedProvince1))?.name,
              data: [1500000, 1520000, 1550000, 1530000, 1560000],
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
              label: provinces.find(p => p.id === parseInt(selectedProvince2))?.name,
              data: [2000000, 2020000, 2050000, 2030000, 2060000],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
          ]
        },
        agingIndex: {
          labels: ['2019', '2020', '2021', '2022', '2023'],
          datasets: [
            {
              label: provinces.find(p => p.id === parseInt(selectedProvince1))?.name,
              data: [24.1, 23.9, 26.5, 27.3, 28.6],
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
              label: provinces.find(p => p.id === parseInt(selectedProvince2))?.name,
              data: [22.1, 21.9, 24.5, 25.3, 26.6],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
          ]
        }
      });
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'So sánh chỉ số qua các năm',
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">So sánh tỉnh thành</h5>
              <NavigateButton to="/" className="btn btn-dark">
                Trang Chủ
              </NavigateButton>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <div className="mb-3">
                    <label className="form-label">Chọn tỉnh thứ nhất</label>
                    <select 
                      className="form-select"
                      value={selectedProvince1}
                      onChange={(e) => setSelectedProvince1(e.target.value)}
                    >
                      <option value="">Chọn tỉnh...</option>
                      {provinces.map(province => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="mb-3">
                    <label className="form-label">Chọn tỉnh thứ hai</label>
                    <select 
                      className="form-select"
                      value={selectedProvince2}
                      onChange={(e) => setSelectedProvince2(e.target.value)}
                    >
                      <option value="">Chọn tỉnh...</option>
                      {provinces.map(province => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button 
                    className="btn btn-primary w-100"
                    onClick={handleCompare}
                    disabled={!selectedProvince1 || !selectedProvince2}
                  >
                    So sánh
                  </button>
                </div>
              </div>
            </div>
          </div>

          {comparisonData && (
            <>
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Dân số qua các năm</h5>
                    </div>
                    <div className="card-body">
                      <Line data={comparisonData.population} options={chartOptions} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Chỉ số già hóa qua các năm</h5>
                    </div>
                    <div className="card-body">
                      <Bar data={comparisonData.agingIndex} options={chartOptions} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareProvinces;
