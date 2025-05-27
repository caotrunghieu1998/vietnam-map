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
import { ProvinceService } from "../../services/ProvinceService";
import { toast } from "react-toastify";

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

const CompareProvinces = ({
  title,
  dataProvince = [],
  setLoadding = () => { }
}) => {
  document.title = title;
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince1, setSelectedProvince1] = useState("");
  const [selectedProvince2, setSelectedProvince2] = useState("");
  const [comparisonData, setComparisonData] = useState(null);

  useEffect(() => {
    setProvinces([...dataProvince.map(item => ({
      id: item.province_code,
      name: item.province_name,
    }))]);
  }, [dataProvince]);

  // Mock data for comparison - replace with actual API call
  const handleCompare = async () => {
    if (selectedProvince1 && selectedProvince2) {
      setLoadding(true);
      const data = await ProvinceService.soSanh(selectedProvince1, selectedProvince2);
      if (!data) {
        toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau.");
        setLoadding(false);
        return;
      }
      const { province1, province2 } = data;
      const dataComparison = {};

      // chisogiahoa
      if (province1 && province2 && province1.chisogiahoa && province2.chisogiahoa) {
        const chisogiahoa = {
          labels: province1.chisogiahoa.map(item => item.info_year),
          datasets: [
            {
              label: province1.province_name,
              data: province1.chisogiahoa.map(item => Number(item.info_quantity)),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
              label: province2.province_name,
              data: province2.chisogiahoa.map(item => Number(item.info_quantity)),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
          ]
        }
        dataComparison['chisogiahoa'] = chisogiahoa;
      }

      // dancutheonhomtuoi
      if (province1 && province2 && province1.dancutheonhomtuoi && province2.dancutheonhomtuoi) {
        const dancutheonhomtuoi = {
          labels: province1.dancutheonhomtuoi.map(item => item.info_year).filter((value, index, self) => self.indexOf(value) === index),
          datasets: [
            {
              label: `${province1.province_name} (0-14)`,
              data: province1.dancutheonhomtuoi.filter(item => item.age_group === "0-14").map(item => Number(item.population)),
              borderColor: '#00CED1',
              backgroundColor: '#00CED1',
            },
            {
              label: `${province1.province_name} (15-29)`,
              data: province1.dancutheonhomtuoi.filter(item => item.age_group === "15-29").map(item => Number(item.population)),
              borderColor: '#3CB371',
              backgroundColor: '#3CB371',
            },
            {
              label: `${province1.province_name} (30-59)`,
              data: province1.dancutheonhomtuoi.filter(item => item.age_group === "30-59").map(item => Number(item.population)),
              borderColor: '#9370DB',
              backgroundColor: '#9370DB',
            },
            {
              label: `${province2.province_name} (0-14)`,
              data: province2.dancutheonhomtuoi.filter(item => item.age_group === "0-14").map(item => Number(item.population)),
              borderColor: '#FF4500',
              backgroundColor: '#FF4500',
            },
            {
              label: `${province2.province_name} (15-29)`,
              data: province2.dancutheonhomtuoi.filter(item => item.age_group === "15-29").map(item => Number(item.population)),
              borderColor: '#FFD700',
              backgroundColor: '#FFD700',
            },
            {
              label: `${province2.province_name} (30-59)`,
              data: province2.dancutheonhomtuoi.filter(item => item.age_group === "30-59").map(item => Number(item.population)),
              borderColor: 'rgba(0, 0, 0, 0.5)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          ]
        }
        dataComparison['dancutheonhomtuoi'] = dancutheonhomtuoi;
      }

      // dansotrungbinh
      if (province1 && province2 && province1.dansotrungbinh && province2.dansotrungbinh) {
        const dansotrungbinh = {
          labels: province1.dansotrungbinh.map(item => item.info_year),
          datasets: [
            {
              label: province1.province_name,
              data: province1.dansotrungbinh.map(item => Number(item.info_quantity)),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
              label: province2.province_name,
              data: province2.dansotrungbinh.map(item => Number(item.info_quantity)),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
          ]
        }
        dataComparison['dansotrungbinh'] = dansotrungbinh;
      }

      // grdp
      if (province1 && province2 && province1.grdp && province2.grdp) {
        const grdp = {
          labels: province1.grdp.map(item => item.info_year),
          datasets: [
            {
              label: province1.province_name,
              data: province1.grdp.map(item => Number(item.growth_rate)),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
              label: province2.province_name,
              data: province2.grdp.map(item => Number(item.growth_rate)),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
          ]
        }
        dataComparison['grdp'] = grdp;
      }

      // tisuatsinh
      if (province1 && province2 && province1.tisuatsinh && province2.tisuatsinh) {
        const tisuatsinh = {
          labels: province1.tisuatsinh.map(item => item.info_year),
          datasets: [
            {
              label: province1.province_name,
              data: province1.tisuatsinh.map(item => Number(item.info_quantity)),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
              label: province2.province_name,
              data: province2.tisuatsinh.map(item => Number(item.info_quantity)),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
          ]
        }
        dataComparison['tisuatsinh'] = tisuatsinh;
      }

      // tongsohodancu
      if (province1 && province2 && province1.tongsohodancu && province2.tongsohodancu) {
        const tongsohodancu = {
          labels: province1.tongsohodancu.map(item => item.info_year),
          datasets: [
            {
              label: province1.province_name,
              data: province1.tongsohodancu.map(item => Number(item.info_quantity)),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
              label: province2.province_name,
              data: province2.tongsohodancu.map(item => Number(item.info_quantity)),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
          ]
        }
        dataComparison['tongsohodancu'] = tongsohodancu;
      }

      setComparisonData(dataComparison);
      setLoadding(false);
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
              {/* chisogiahoa */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Chỉ số già hóa:</h5>
                    </div>
                    <div className="card-body">
                      {
                        !!comparisonData.chisogiahoa ?
                          <Line data={comparisonData.chisogiahoa} options={chartOptions} /> :
                          <p>Không đủ dữ liệu để so sánh!</p>
                      }
                    </div>
                  </div>
                </div>
              </div>
               {/* dancutheonhomtuoi */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Dân cư theo nhóm tuổi:</h5>
                    </div>
                    <div className="card-body">
                      {
                        !!comparisonData.dancutheonhomtuoi ?
                          <Bar data={comparisonData.dancutheonhomtuoi} options={chartOptions} /> :
                          <p>Không đủ dữ liệu để so sánh!</p>
                      }

                    </div>
                  </div>
                </div>
              </div>
              {/* dansotrungbinh */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Số dân trung bình:</h5>
                    </div>
                    <div className="card-body">
                      {
                        !!comparisonData.dansotrungbinh ?
                          <Line data={comparisonData.dansotrungbinh} options={chartOptions} /> :
                          <p>Không đủ dữ liệu để so sánh!</p>
                      }
                    </div>
                  </div>
                </div>
              </div>
              {/* GRDP */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">GRDP:</h5>
                    </div>
                    <div className="card-body">
                      {
                        !!comparisonData.grdp ?
                          <Bar data={comparisonData.grdp} options={chartOptions} /> :
                          <p>Không đủ dữ liệu để so sánh!</p>
                      }

                    </div>
                  </div>
                </div>
              </div>
              {/* tisuatsinh */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Tỉ xuất sinh:</h5>
                    </div>
                    <div className="card-body">
                      {
                        !!comparisonData.tisuatsinh ?
                          <Line data={comparisonData.tisuatsinh} options={chartOptions} /> :
                          <p>Không đủ dữ liệu để so sánh!</p>
                      }
                    </div>
                  </div>
                </div>
              </div>
               {/* tongsohodancu */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Tổng số hộ dân cư:</h5>
                    </div>
                    <div className="card-body">
                      {
                        !!comparisonData.tongsohodancu ?
                          <Bar data={comparisonData.tongsohodancu} options={chartOptions} /> :
                          <p>Không đủ dữ liệu để so sánh!</p>
                      }

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
