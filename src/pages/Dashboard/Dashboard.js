import React, { useEffect, useState } from "react";
import { fetchData } from "../../components/fetchData";
import manWithLaptop from "../../assets/img/illustrations/man-with-laptop.png";
import NavigateButton from "../../components/Navigate";
import { replace, useNavigate } from "react-router-dom";
import axios from "axios";
import nv from '../../data/vietnam.json';
import gadm36_XPI_0 from '../../data/gadm36_XPI_0.json';
import gadm36_XSP_0 from '../../data/gadm36_XSP_0.json';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps";
import markerIcon from "../../assets/img/icons/marker.png";
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

// Đăng ký các components của Chart.js
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

const Dashboard = ({ title }) => {
  document.title = title;
  const navigate = useNavigate();
  const vietNam = [nv, gadm36_XPI_0, gadm36_XSP_0];
  const geoUrl = gadm36_XSP_0;
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFromSearch, setSelectedFromSearch] = useState(null);

  const handleMouseEnter = (geo) => {
    setHoveredProvince(geo.properties);
    console.log("Thông tin tỉnh:", geo);
  };

  const handleMouseLeave = () => {
    setHoveredProvince(null);
  };

  const handleProvinceClick = (geo, event) => {
    let position;
    if (event) {
      const rect = event.target.getBoundingClientRect();
      position = {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY
      };
    } else {
      position = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      };
    }
    setPopupPosition(position);
    setSelectedProvince(geo.properties);
    setSelectedFromSearch(geo.properties.id);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProvince(null);
    setSelectedFromSearch(null);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchKeyword(keyword);
    
    if (keyword) {
      const results = vietNam
        .flatMap(geoData => geoData.features || [])
        .filter(geo => geo.properties.name.toLowerCase().includes(keyword));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const highlightedRegions = [
    { id: "VNHN", icon: markerIcon, x: -8, y: -18 },
    { id: "VNSG", icon: markerIcon, x: -1, y: -8 },
    { id: "VN33", icon: markerIcon, x: -9, y: -25 },
    { id: "VN26", icon: markerIcon, x: 1, y: -11 },
    { id: "VN23", icon: markerIcon, x: 1, y: -5 },
    { id: "VN59", icon: markerIcon, x: -2, y: -5 }
  ];

  // Thêm tọa độ cho Hoàng Sa và Trường Sa
  const specialRegions = [
    {
      name: "Quần đảo Hoàng Sa",
      coordinates: [112.5, 16.5], // Tọa độ Hoàng Sa
      type: "island"
    },
    {
      name: "Quần đảo Trường Sa",
      coordinates: [114.5, 10.5], // Tọa độ Trường Sa
      type: "island"
    }
  ];

  // Data cho biểu đồ dân số
  const populationData = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Dân số trung bình',
        data: [1500000, 1520000, 1550000, 1530000, 1560000],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Data cho biểu đồ chỉ số già hóa
  const agingData = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Chỉ số già hóa (%)',
        data: [24.1, 23.9, 26.5, 27.3, 28.6],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  // Options cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê dân số qua các năm',
      },
    },
  };

  return (
    <>
      {/* Navbar cố định trên cùng */}
      <div className="navbar fixed-top bg-secondary px-4 py-2 shadow-sm z-10 d-flex justify-content-between align-items-center">
        {/* Thanh search và filter */}
        <div className="d-flex align-items-center position-relative">
          <input 
            type="search" 
            className="form-control form-control-sm me-2" 
            placeholder="Tìm kiếm tỉnh thành..." 
            value={searchKeyword}
            onChange={handleSearch}
            style={{ 
              width: '250px',
              borderRadius: '20px',
              paddingLeft: '15px',
              border: '1px solid #e0e0e0'
            }}
          />
          
          {searchResults.length > 0 && searchKeyword && (
            <div className="position-absolute top-100 start-0 mt-1 w-100 bg-white shadow-sm rounded-3 border" 
                 style={{ maxHeight: '200px', overflowY: 'auto', zIndex: 1000 }}>
              {searchResults.map((result, index) => (
                <div 
                  key={index}
                  className="px-3 py-2 cursor-pointer"
                  onClick={() => {
                    handleProvinceClick(result, null);
                    setSearchKeyword('');
                    setSearchResults([]);
                  }}
                  style={{ 
                    cursor: 'pointer',
                    color: '#000',
                    transition: 'all 0.2s',
                    backgroundColor: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8f9fa'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white'
                  }}
                >
                  {result.properties.name}
                </div>
              ))}
            </div>
          )}

          <button 
            className="btn btn-sm btn-light me-2" 
            style={{ borderRadius: '20px' }}
            onClick={() => {
              if (searchResults.length > 0) {
                handleProvinceClick(searchResults[0], null);
                setSearchKeyword('');
                setSearchResults([]);
              }
            }}
          >
            <i className="fas fa-search"></i> Tìm
          </button>

          {/* Thêm filter năm */}
          <select 
            className="form-select form-select-sm" 
            style={{ 
              width: '120px',
              borderRadius: '20px',
              border: '1px solid #e0e0e0'
            }}
          >
            <option value="">Chọn năm</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>

        {/* Nút đăng nhập/đăng xuất và tên người dùng */}
        <div className="d-flex align-items-center gap-2">
          {localStorage.getItem("access_token") ? (
            <>
              <span className="text-white me-2">
                <i className="fas fa-user-circle me-1"></i>
                {localStorage.getItem("user_name") || "Người dùng"}
              </span>
              <NavigateButton
                to="/logout"
                className="btn btn-sm btn-outline-light"
              >
                <i className="fas fa-sign-out-alt me-1"></i>
                Đăng Xuất
              </NavigateButton>
            </>
          ) : (
            <NavigateButton
              to="/login"
              className="btn btn-sm btn-outline-light"
            >
              <i className="fas fa-sign-in-alt me-1"></i>
              Đăng Nhập
            </NavigateButton>
          )}
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="position-fixed start-0 top-50 translate-middle-y d-flex flex-column gap-2 p-2" style={{ zIndex: 1000 }}>
        <NavigateButton
          to="/nhap-du-lieu-tinh"
          className="btn btn-light shadow-sm"
          style={{ width: '150px', borderRadius: '10px' }}
        >
          <i className="fas fa-database me-2"></i>
          Nhập dữ liệu
        </NavigateButton>
        <NavigateButton
          to="/so-sanh-tinh-thanh"
          className="btn btn-light shadow-sm"
          style={{ width: '150px', borderRadius: '10px' }}
        >
          <i className="fas fa-chart-bar me-2"></i>
          So sánh tỉnh thành
        </NavigateButton>
        <NavigateButton
          to="/tin-tuc"
          className="btn btn-light shadow-sm"
          style={{ width: '150px', borderRadius: '10px' }}
        >
          <i className="fas fa-file-alt me-2"></i>
          Tin Tức
        </NavigateButton>
        <NavigateButton
          to="/tin-tuc"
          className="btn btn-light shadow-sm"
          style={{ width: '150px', borderRadius: '10px' }}
        >
          <i className="fas fa-chart-line me-2"></i>
          Phân tích
        </NavigateButton>
        <NavigateButton
          to="/cai-dat"
          className="btn btn-light shadow-sm"
          style={{ width: '150px', borderRadius: '10px' }}
        >
          <i className="fas fa-cog me-2"></i>
          Cài đặt
        </NavigateButton>
      </div>

      {/* Thêm margin để tránh bị navbar che */}
      <div className="container-fluid">
        <div className="row">
          {/* Cột bản đồ - chiếm 8 cột */}
          <div className="col-lg-8">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-6 mb-6 relative">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    scale: 1500,
                    center: [105, 17]
                  }}
                  style={{ width: "100%", height: "auto" }}
                >
                  <ZoomableGroup>
                    {vietNam.map((geoUrl, index) => (
                      <Geographies key={index} geography={geoUrl}>
                        {({ geographies }) =>
                          geographies.map((geo) => {
                            const isHighlighted = highlightedRegions.some(region => region.id === geo.properties.id);
                            return (
                              <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onClick={(event) => handleProvinceClick(geo, event)}
                                onMouseEnter={() => handleMouseEnter(geo)}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                  default: {
                                    fill: selectedFromSearch === geo.properties.id ? "#7B00FFFF" : 
                                          isHighlighted ? "#FF8000FF" : "#D6D6DA",
                                    outline: "none",
                                    cursor: 'pointer',
                                  },
                                  hover: {
                                    fill: "#7B00FFFF",
                                    stroke: "#FF00A6FF",
                                    strokeWidth: 0.3,
                                    outline: "none",
                                  },
                                  pressed: {
                                    fill: "#E42",
                                    outline: "none",
                                  },
                                }}
                              />
                            );
                          })
                        }
                      </Geographies>
                    ))}
                    {highlightedRegions.map((region) => {
                      let matchedGeo = null;
                      for (const geoFile of vietNam) {
                        if (geoFile.features) {
                          matchedGeo = geoFile.features.find((f) => f.properties.id === region.id);
                          if (matchedGeo) break;
                        }
                      }

                      if (!matchedGeo) return null;

                      const coordinates = matchedGeo.geometry.coordinates;
                      let markerCoordinates = [];

                      if (matchedGeo.geometry.type === "Polygon") {
                        markerCoordinates = matchedGeo.geometry.coordinates[0][0];
                      } else if (matchedGeo.geometry.type === "MultiPolygon") {
                        markerCoordinates = matchedGeo.geometry.coordinates[0][0][0];
                      }

                      return (
                        <Marker key={region.id} coordinates={markerCoordinates}>
                          <image
                            href={region.icon}
                            width="10"
                            height="10"
                            x={region.x}
                            y={region.y}
                          />
                        </Marker>
                      );
                    })}

                    {/* Thêm Hoàng Sa và Trường Sa */}
                    {specialRegions.map((region, index) => (
                      <Marker key={index} coordinates={region.coordinates}>
                        <g transform="translate(-8, -16)">
                          {/* Điểm đánh dấu */}
                          <circle
                            r="2"
                            fill="#FF2D00"
                            stroke="#FFFFFF"
                            strokeWidth="1"
                          />
                          {/* Tên quần đảo */}
                          <text
                            textAnchor="middle"
                            y={15}
                            style={{
                              fontFamily: "Arial",
                              fontSize: "5px",
                              fontWeight: "bold",
                              fill: "#FF2D00",
                              textShadow: "0.5px 0.5px 0.5px rgba(255,255,255,0.5)",
                              userSelect: "none"
                            }}
                          >
                            {region.name}
                          </text>
                          {/* Đường chấm nối */}
                          <line
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="12"
                            stroke="#FF2D00"
                            strokeWidth="0.5"
                            strokeDasharray="1,1"
                          />
                        </g>
                      </Marker>
                    ))}
                  </ZoomableGroup>
                </ComposableMap>

                {showPopup && selectedProvince && (
                  <div
                    className="card shadow-sm position-absolute"
                    style={{
                      left: `${popupPosition.x + 20}px`,
                      top: `${popupPosition.y - 20}px`,
                      zIndex: 1000,
                      minWidth: '200px',
                      maxWidth: '300px',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      animation: 'fadeIn 0.3s'
                    }}
                  >
                    <div className="card-header d-flex justify-content-between align-items-center py-2">
                      <h6 className="m-0">Thông tin tỉnh</h6>
                      <button
                        type="button"
                        className="btn-close btn-sm"
                        onClick={handleClosePopup}
                      ></button>
                    </div>
                    <div className="card-body py-2">
                      <p className="mb-1"><strong>{selectedProvince.name}</strong></p>
                      <p className="mb-1">Dân số trung bình <strong>3.409.812</strong> người</p>
                      <p className="mb-1">Tổng diện tích <strong>1.648,6</strong> km2</p>
                      <p className="mb-1">GRDP bình quân đầu người <strong>46</strong> triệu đồng</p>
                      <p className="mb-1">Phụ nữ từ 15-49 tuổi <strong>793.286</strong> người</p>
                      <p className="mb-1">Tuổi thọ trung bình <strong>73,1</strong> tuổi</p>
                      <p className="mb-1 text-muted fst-italic">(Theo số liệu thống kê năm 2021)</p>
                      <small className="text-muted">ID: {selectedProvince.id}</small>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cột biểu đồ - chiếm 4 cột */}
          <div className="col-lg-4" style={{ marginTop: "85px" }}>
            <div className="card mb-4" style={{ backgroundColor: 'white', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <div className="card-header" style={{ backgroundColor: 'white', borderBottom: '1px solid #e0e0e0' }}>
                <h5 className="card-title mb-0">Thống kê dân số</h5>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <Line 
                    data={populationData} 
                    options={{
                      ...options,
                      plugins: {
                        ...options.plugins,
                        legend: {
                          ...options.plugins.legend,
                          labels: {
                            color: '#666'
                          }
                        }
                      },
                      scales: {
                        y: {
                          grid: {
                            color: '#e0e0e0'
                          },
                          ticks: {
                            color: '#666'
                          }
                        },
                        x: {
                          grid: {
                            color: '#e0e0e0'
                          },
                          ticks: {
                            color: '#666'
                          }
                        }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>

            <div className="card" style={{ backgroundColor: 'white', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <div className="card-header" style={{ backgroundColor: 'white', borderBottom: '1px solid #e0e0e0' }}>
                <h5 className="card-title mb-0">Chỉ số già hóa</h5>
              </div>
              <div className="card-body">
                <div>
                  <Bar 
                    data={agingData} 
                    options={{
                      ...options,
                      plugins: {
                        ...options.plugins,
                        title: {
                          ...options.plugins.title,
                          text: 'Chỉ số già hóa qua các năm'
                        },
                        legend: {
                          ...options.plugins.legend,
                          labels: {
                            color: '#666'
                          }
                        }
                      },
                      scales: {
                        y: {
                          grid: {
                            color: '#e0e0e0'
                          },
                          ticks: {
                            color: '#666'
                          }
                        },
                        x: {
                          grid: {
                            color: '#e0e0e0'
                          },
                          ticks: {
                            color: '#666'
                          }
                        }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thêm style cho animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.8;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          circle {
            animation: pulse 2s infinite;
          }
        `}
      </style>
    </>
  );
};

export default Dashboard;
