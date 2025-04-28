import './App.css';
import nv from './vn.json';
import gadm36_XPI_0 from './json/gadm36_XPI_0.json';
import gadm36_XSP_0 from './json/gadm36_XSP_0.json';
// import nv1 from './vn1.json';

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps";

const vietnamGeoUrl =
  "https://gist.githubusercontent.com/tandat2209/5eb797fc2bcc1c8b6d71271353a40ab4/raw/ca883f00b7843afeb7b6ad73ec4370ab514a8a90/gadm36_VNM_0.json";

const paracelIslandsGeoUrl =
  "https://gist.githubusercontent.com/tandat2209/5eb797fc2bcc1c8b6d71271353a40ab4/raw/ca883f00b7843afeb7b6ad73ec4370ab514a8a90/gadm36_XPI_0.json";

const spralyIslandsGeoUrl =
  "https://gist.githubusercontent.com/tandat2209/5eb797fc2bcc1c8b6d71271353a40ab4/raw/ca883f00b7843afeb7b6ad73ec4370ab514a8a90/gadm36_XSP_0.json";


// Link tới file GeoJSON
// const geoUrl = "http://localhost:3000/vn.json";
const vietNam = [nv, gadm36_XPI_0, gadm36_XSP_0];

// const vietNam = [vietnamGeoUrl, paracelIslandsGeoUrl, spralyIslandsGeoUrl];

const geoUrl = gadm36_XSP_0;

const VietnamMap = () => {
  const [hoveredProvince, setHoveredProvince] = useState(null);

  const handleMouseEnter = (geo) => {
    setHoveredProvince(geo.properties);
    console.log("Thông tin tỉnh:", geo);
  };

  const handleMouseLeave = () => {
    setHoveredProvince(null);
  };

  // ID hoặc tên 6 vùng bạn muốn đổi màu và thêm marker
  const highlightedRegions = [
    { id: "VNHN", icon: "/marker.png", x: -10, y: -25 },
    { id: "VNSG", icon: "/marker.png", x: -5, y: -15 },
    { id: "VN33", icon: "/marker.png", x: -10, y: -30 },
    { id: "VN26", icon: "/marker.png", x: -3, y: -20 },
    { id: "VN23", icon: "/marker.png", x: -1, y: -12 },
    { id: "VN59", icon: "/marker.png", x: -5, y: -10 }
  ];

  return (
    <div>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1000,
          center: [105, 15] // coordinate of VietNam [long, lat]
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
                      onMouseEnter={() => handleMouseEnter(geo)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        default: {
                          fill: isHighlighted ? "#FF8000FF" : "#D6D6DA",
                          outline: "none",
                        },
                        hover: {
                          fill: hoveredProvince?.name === geo.properties.name ? "#7B00FFFF" : "#D6D6DA",
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
          // Tìm tỉnh tương ứng
          let matchedGeo = null;
          for (const geoFile of vietNam) {
            if (geoFile.features) {
              matchedGeo = geoFile.features.find((f) => f.properties.id === region.id);
              if (matchedGeo) break;
            }
          }

          if (!matchedGeo) return null; // Nếu không tìm thấy thì bỏ qua

          // Lấy tọa độ
          const coordinates = matchedGeo.geometry.coordinates;
          let markerCoordinates = [];

          // Chú ý: nếu geometry là Polygon hoặc MultiPolygon thì cần xử lý khác nhau
          if (matchedGeo.geometry.type === "Polygon") {
            // Lấy trung tâm đại khái bằng điểm đầu tiên
            markerCoordinates = matchedGeo.geometry.coordinates[0][0];
          } else if (matchedGeo.geometry.type === "MultiPolygon") {
            // Nếu là MultiPolygon (nhiều mảng), lấy mảng đầu tiên, điểm đầu tiên
            markerCoordinates = matchedGeo.geometry.coordinates[0][0][0];
          }

          return (
            <Marker key={region.id} coordinates={markerCoordinates}>
              <image
                href={region.icon}
                width="20"
                height="20"
                x={region.x}
                y={region.y}
              />
            </Marker>
          );
        })}
        </ZoomableGroup>
      </ComposableMap>

      {(hoveredProvince || true) && (
        <div className='popup-info'>
          <div className='btn-close' title='Close'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </div>
          <h3>Thông tin tỉnh: {hoveredProvince?.name || "Bạn hãy chọn tỉnh?"}</h3>
        </div>
      )}
    </div>
  );
};

function App() {
  return <VietnamMap />

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;