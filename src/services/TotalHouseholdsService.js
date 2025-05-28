import { CUSTOM_AXIOS } from "../api/customAxios";
import { API_URL_INFO } from "../api/URLS";
import {
    DATA_TYPES,
    errorTextCommon,
    getAllData
} from "./common";

export const TotalHouseholdsService = {
    getAll: async () => {
        const data = await getAllData(DATA_TYPES.TOTAL_HOUSEHOLDS);
        return data;
    },
    create: async ({
        info_quantity,
        info_year,
        province_code,
        create_by
    }) => {
        try {
            const data = await CUSTOM_AXIOS.POST({
                url: API_URL_INFO.TOTAL_HOUSEHOLDS_CREATE,
                body: {
                    info_quantity: Number(info_quantity),
                    info_year: Number(info_year),
                    province_code,
                    create_by,
                }
            });

            if (data?.status === 200) {
                return {
                    success: true,
                    message: data.message,
                };
            } else {
                return {
                    success: false,
                    message: data.message || errorTextCommon,
                };
            }
        } catch (error) {
            console.log("Error when BirthRateService CREARE: ", error);
            return {
                success: false,
                message: errorTextCommon,
            };
        }
    },
    update: async ({
        info_quantity,
        info_year,
        province_code,
        update_by
    }) => {
        try {
            const data = await CUSTOM_AXIOS.POST({
                url: API_URL_INFO.TOTAL_HOUSEHOLDS_UPDATE,
                body: {
                    info_quantity: Number(info_quantity),
                    info_year: Number(info_year),
                    province_code,
                    update_by,
                }
            });

            if (data?.status === 200) {
                return {
                    success: true,
                    message: data.message,
                };
            } else {
                return {
                    success: false,
                    message: data.message || errorTextCommon,
                };
            }
        } catch (error) {
            console.log("Error when BirthRateService update: ", error);
            return {
                success: false,
                message: errorTextCommon,
            };
        }
    },
    delete: async ({
        info_year,
        province_code,
    }) => {
        try {
            const data = await CUSTOM_AXIOS.POST({
                url: API_URL_INFO.TOTAL_HOUSEHOLDS_DELETE,
                body: {
                    info_year: Number(info_year),
                    province_code,
                }
            });

            if (data?.status === 200) {
                return {
                    success: true,
                    message: data.message,
                };
            } else {
                return {
                    success: false,
                    message: data.message || errorTextCommon,
                };
            }
        } catch (error) {
            console.log("Error when BirthRateService delete: ", error);
            return {
                success: false,
                message: errorTextCommon,
            };
        }
    },
};