import { useLocation } from "react-router-dom";
import NavigateButton from "../../components/Navigate";
import { useMemo } from "react";

const NavigateMenu = () => {
  const location = useLocation();
  const data = useMemo(() => {
    return [
        {
            title: "Chỉ số già hóa",
            isSelected: location?.pathname === "/nhap-du-chi-so-gia-hoa",
            navigateTo: '/nhap-du-chi-so-gia-hoa',
        }, 
        {
            title: "Tỉ lệ sinh",
            isSelected: location?.pathname === "/ti-le-sinh",
            navigateTo: '/ti-le-sinh',
        }, 
        {
            title: "Dân số trung bình",
            isSelected: location?.pathname === "/dstb",
            navigateTo: '/dstb',
        }, 
        {
            title: "GRDP",
            isSelected: location?.pathname === "/grdp",
            navigateTo: '/grdp',
        }, 
        {
            title: "Total house holds",
            isSelected: location?.pathname === "/total_households",
            navigateTo: '/total_households',
        }, 
        {
            title: "Đổi mật khẩu",
            isSelected: location?.pathname === "/doi-mat-khau",
            navigateTo: '/doi-mat-khau',
        }
    ];
  }, [location])

  return <div className="navigate-menu">
    {
        data.map((data, index) => <NavigateButton key={index} to={data.navigateTo} className={`btn ${data.isSelected ? 'btn-dark' : 'btn-light'}`}>{data.title}</NavigateButton>)
    }
  </div>;
};

export default NavigateMenu;
