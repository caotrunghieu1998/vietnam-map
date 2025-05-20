import { API_URL_INFO, MY_UUID } from "./URLS";
import { CUSTOM_AXIOS } from "./customAxios";

const sampleDataReturn = {
    isSuccess: true,
    data: null,
    errorMessage: '',
};

const errorTextCommon = "Đã có lỗi xảy ra";

export const DEPARTMENRS_VERVICE = {
    getAllData: async () => {
        const dataReturn = { ...sampleDataReturn };

        const getAll = async () => {
            const dataReturn = { ...sampleDataReturn };

            try {
                const data = await CUSTOM_AXIOS.GET(
                    {
                        url: API_URL_INFO.DEPARTMENTS_ALL,
                    });

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

        const getAllProInfo = async () => {
            const dataReturn = { ...sampleDataReturn };

            try {
                const data = await CUSTOM_AXIOS.GET(
                    {
                        url: API_URL_INFO.DEPARTMENTS_ALL_PRO_INFO,
                    });

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


        try {
            const [resGetAll, resGetAllProInfo] = await Promise.all([getAll(), getAllProInfo()]);
            
            if (resGetAll.errorMessage || resGetAllProInfo.errorMessage) {
                throw new Error(resGetAll.errorMessage || resGetAllProInfo.errorMessage || errorTextCommon);
            }

            const merged = resGetAll.data.map(item1 => {
                const match = resGetAllProInfo.data.find(item2 => item2.province_code === item1.province_code);
                return {
                    province_code: item1.province_code,
                    province_name: item1.province_name,
                    nam: new Date(item1.create_at).getFullYear(),
                    dien_tich: match ? parseFloat(match.area) : null,
                    tuoi_tho_trung_binh: match ? parseFloat(match.life_expectancy) : null
                };
            });

            dataReturn.isSuccess = true;
            dataReturn.data = merged;
        } catch (error) {
            dataReturn.errorMessage = error.message;
        } finally {
            return dataReturn;
        }
    },
};