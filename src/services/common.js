import { CUSTOM_AXIOS } from "../api/customAxios";
import { API_URL_INFO } from "../api/URLS";

export const sampleDataReturn = {
    isSuccess: true,
    data: null,
    errorMessage: '',
};

export const errorTextCommon = "Đã có lỗi xảy ra";

export const DATA_TYPES = Object.freeze({
    UNIT: 'UNIT',
    AGING_INDEX: 'AGING_INDEX',
    BIRTH_RATE: 'BIRTH_RATE',
    DSTB: 'DSTB',
    GRDP: 'GRDP',
    POP_AGE: 'POP_AGE',
    PRO_INFO: 'PRO_INFO',
    PROVINCE: 'PROVINCE',
    TOTAL_HOUSEHOLDS: 'TOTAL_HOUSEHOLDS',
});

export const getAllData = async (type = "") => {
    const dataReturn = { ...sampleDataReturn };

    if (!DATA_TYPES[type]) {
        dataReturn.isSuccess = false;
        dataReturn.errorMessage = "Type not found.";
        return dataReturn;
    }

    try {
        let url = "";
        if (type === DATA_TYPES.AGING_INDEX) url = API_URL_INFO.AGING_INDEX_ALL;
        else if (type === DATA_TYPES.BIRTH_RATE) url = API_URL_INFO.BIRTH_RATE_ALL;
        else if (type === DATA_TYPES.DSTB) url = API_URL_INFO.DSTB_ALL;
        else if (type === DATA_TYPES.GRDP) url = API_URL_INFO.GRDP_ALL;
        else if (type === DATA_TYPES.POP_AGE) url = API_URL_INFO.POP_AGE_ALL;
        else if (type === DATA_TYPES.PRO_INFO) url = API_URL_INFO.PRO_INFO_ALL;
        else if (type === DATA_TYPES.PROVINCE) url = API_URL_INFO.PROVINCE_ALL;
        else if (type === DATA_TYPES.TOTAL_HOUSEHOLDS) url = API_URL_INFO.TOTAL_HOUSEHOLDS_ALL;
        else if (type === DATA_TYPES.UNIT) url = API_URL_INFO.UNIT_ALL;

        if (!url) {
            dataReturn.isSuccess = false;
            dataReturn.errorMessage = "Type not found.";
            return dataReturn;
        }

        const data = await CUSTOM_AXIOS.GET({ url });

        if (data.status === 200) {
            dataReturn.isSuccess = true;
            dataReturn.data = data.data;
        } else {
            dataReturn.errorMessage = data.message || errorTextCommon;
        }
    } catch (error) {
        dataReturn.errorMessage = error.message;
    } finally {
        return dataReturn;
    }
}