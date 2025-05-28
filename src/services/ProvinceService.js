import {
    CUSTOM_AXIOS
} from "../api/customAxios";
import {
    API_URL_INFO
} from "../api/URLS";
import {
    DATA_TYPES,
    getAllData
} from "./common";

export const ProvinceService = {
    getAll: async () => {
        const data = await getAllData(DATA_TYPES.PROVINCE);
        return data;
    },
    soSanh: async (province_code1, province_code2) => {
        try {
            if (!province_code1 || !province_code2) return;
            const data = await CUSTOM_AXIOS.POST({
                url: API_URL_INFO.PROVINCE_SO_SANH,
                body: {
                    province_code1,
                    province_code2,
                    info_year: "",
                    target_code: "",
                }
            });

            if (data?.status === 200) {
                return data.data;
            }
        } catch (error) {
            console.log("Error when so sanh tinh: ", error);
        }
    },
    getProvinceCode: async (province_code) => {
        try {
            if (!province_code) return;
            const data = await CUSTOM_AXIOS.POST({
                url: API_URL_INFO.PROVINCE_GET_PROVINCE_CODE,
                body: {
                    province_code,
                }
            });

            if (data?.status === 200) {
                return data.data;
            }
        } catch (error) {
            console.log("Error when so sanh tinh: ", error);
        }
    },
    dudoandanso: async (province_code, info_year) => {
        try {
            if (!info_year || !province_code) return;
            const data = await CUSTOM_AXIOS.POST({
                url: API_URL_INFO.PROVINCE_dudoandanso,
                body: {
                    province_code,
                    info_year,
                }
            });

            if (data?.status === 200) {
                return data.data;
            }
        } catch (error) {
            console.log("Error when so sanh tinh: ", error);
        }
    }
};