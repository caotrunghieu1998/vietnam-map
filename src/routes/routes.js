import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Login, Forgot } from "../pages/Auth/Auth";
// import { UserMe, GetAllUser } from "../pages/User/User";
import Department from "../pages/Departments/Departments";
import Introduce from "../pages/Introduce/Introduce";
import CompareProvinces from "../pages/CompareProvinces/CompareProvinces";
import News from "../pages/News/News";
import Setting from "../pages/Setting/Setting";
// import EmployeeList from "../pages/Employees/EmployeeList";
import Dashboard from "../pages/Dashboard/Dashboard";
import Logout from "../pages/Auth/Logout";
import ProtectedRoute from "../components/ProtectedRoute";
import Loading from "../utils/loading";
import { cloneElement, useEffect, useState } from "react";
import { USER_VERVICE } from "../services/userService";
import { AgingIndexService } from "../services/AgingIndexService";
import { BirthRateService } from "../services/BirthRateService";
import { DSTBService } from "../services/DSTBService";
import { GRDPService } from "../services/GRDPService";
import { PopAgeService } from "../services/PopAgeService";
import { ProInfoService } from "../services/ProInfoService";
import { ProvinceService } from "../services/ProvinceService";
import { TotalHouseholdsService } from "../services/TotalHouseholdsService";
import { toast, ToastContainer } from "react-toastify";
import { UnitService } from "../services/UnitService.js";

// Helper to wrap protected routes
const Protected = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

const ProtectedLogin = ({ children, loadding, setLoadding }) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [dataUser, setDataUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const process = async () => {
      const data = await USER_VERVICE.getUserByUserName();
      if (data.isSuccess) {
        setDataUser(data.data);
        setLoadding(false);
      } else {
        alert(data.errorMessage);
        navigate("/login");
      }
    }

    process();

  }, []);


  if (loadding) return <Loading />

  return dataUser
    ? cloneElement(children, { dataUser })
    : null;
}

const AppRoutes = () => {
  const [loadding, setLoadding] = useState(false);
  const [loaddingBaseData, setLoaddingBaseData] = useState(false);
  const [dataAgingIndex, setDataAgingIndex] = useState([]);
  const [dataBirthRate, setDataBirthRate] = useState([]);
  const [dataDSTB, setDataDSTB] = useState([]);
  const [dataGRDPS, setDataGRDPS] = useState([]);
  const [dataPopAge, setDataPopAge] = useState([]);
  const [dataProInfo, setDataProInfo] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);
  const [dataTotalHouseholds, setDataTotalHouseholds] = useState([]);
  const [unitObject, setDataUnitObject] = useState([]);

  useEffect(() => {
    const getALLData = async () => {
      setLoaddingBaseData(true);
      const [
        dataAgingIndex,
        dataBirthRate,
        dataDSTB,
        dataGRDP,
        dataPopAge,
        dataProInfo,
        dataProvince,
        dataTotalHouseholds,
        dataUnit,
      ] = await Promise.all([
        AgingIndexService.getAll(),
        BirthRateService.getAll(),
        DSTBService.getAll(),
        GRDPService.getAll(),
        PopAgeService.getAll(),
        ProInfoService.getAll(),
        ProvinceService.getAll(),
        TotalHouseholdsService.getAll(),
        UnitService.getAll(),
      ]);
      const error = (
        dataAgingIndex.errorMessage ||
        dataBirthRate.errorMessage ||
        dataDSTB.errorMessage ||
        dataGRDP.errorMessage ||
        dataPopAge.errorMessage ||
        dataProInfo.errorMessage ||
        dataProvince.errorMessage ||
        dataTotalHouseholds.errorMessage
      )
      if (error) toast.error(error);

      const units = (dataUnit.isSuccess && dataUnit.data?.length) ? dataUnit.data : [];

      const unitObject = {};
      units.forEach(unit => {
        unitObject[unit.unit_code] = unit.unit_name;
      });
      setDataUnitObject({ ...unitObject });

      if (dataAgingIndex.isSuccess && dataAgingIndex.data?.length) setDataAgingIndex(dataAgingIndex.data);
      if (dataBirthRate.isSuccess && dataBirthRate.data?.length) setDataBirthRate(dataBirthRate.data);
      if (dataDSTB.isSuccess && dataDSTB.data?.length) setDataDSTB(dataDSTB.data);
      if (dataGRDP.isSuccess && dataGRDP.data?.length) setDataGRDPS(dataGRDP.data);
      if (dataPopAge.isSuccess && dataPopAge.data?.length) setDataPopAge(dataPopAge.data);
      if (dataProInfo.isSuccess && dataProInfo.data?.length) setDataProInfo(dataProInfo.data);
      if (dataProvince.isSuccess && dataProvince.data?.length) setDataProvince(dataProvince.data);
      if (dataTotalHouseholds.isSuccess && dataTotalHouseholds.data?.length) setDataTotalHouseholds(dataTotalHouseholds.data);

      setLoaddingBaseData(false);
    };
    getALLData();
  }, []);



  return (
    <div className={`main-body ${(loadding || loaddingBaseData) ? "loadding" : ''}`}>
      <div id="loadding-screen">
        <div id="loader"></div>
      </div>
      <div id="content-screen">
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Dashboard
              title="Bản đồ Việt Nam"
              dataAgingIndex={dataAgingIndex}
              dataBirthRate={dataBirthRate}
              dataDSTB={dataDSTB}
              dataGRDPS={dataGRDPS}
              dataPopAge={dataPopAge}
              dataProInfo={dataProInfo}
              dataProvince={dataProvince}
              dataTotalHouseholds={dataTotalHouseholds}
              unitObject={unitObject}
            />} />
            <Route
              path="/forgot-password"
              element={<Forgot title="Quên mật khẩu" />}
            />

            {/* Protected Routes */}
            <Route
              path="/login"
              element={<Login title="Đăng Nhập" />}
            />
            <Route
              path="/introduce"
              element={
                <Protected>
                  <Introduce title="Giới thiệu đồ án" />
                </Protected>
              }
            />
            <Route
              path="/so-sanh-tinh-thanh"
              element={
                <Protected>
                  <CompareProvinces 
                    title="So sánh tỉnh thành" 
                    dataProvince={dataProvince}
                    setLoadding={setLoadding}
                  />
                </Protected>
              }
            />
            <Route
              path="/tin-tuc"
              element={<News title="Tin tức địa lý" />}
            />
            <Route
              path="/cai-dat"
              element={<Setting title="Cài đặt hệ thống" />}
            />

            {/* Page need to login */}
            <Route
              path="/logout"
              element={
                <Protected>
                  <Logout title="Đăng xuất" />
                </Protected>
              }
            />
            <Route
              path="/nhap-du-lieu-tinh"
              element={
                <ProtectedLogin loadding={loadding} setLoadding={setLoadding}>
                  <Department title="Nhập dữ liệu tỉnh" />
                </ProtectedLogin>
              }
            />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </div>
    </div>
  )
};

export default AppRoutes;
