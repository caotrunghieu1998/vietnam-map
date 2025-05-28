import {
    CUSTOM_AXIOS
} from "../api/customAxios";
import {
    API_URL_INFO
} from "../api/URLS";
import {
    DATA_TYPES,
    errorTextCommon,
    getAllData
} from "./common";

export const AgingIndexService = {
    getAll: async () => {
        const data = await getAllData(DATA_TYPES.AGING_INDEX);
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
                url: API_URL_INFO.AGING_INDEX_CREATE,
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
            console.log("Error when AgingIndexService CREARE: ", error);
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
                url: API_URL_INFO.AGING_INDEX_UPDATE,
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
            console.log("Error when AgingIndexService update: ", error);
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
                url: API_URL_INFO.AGING_INDEX_DELETE,
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
            console.log("Error when AgingIndexService delete: ", error);
            return {
                success: false,
                message: errorTextCommon,
            };
        }
    },
};