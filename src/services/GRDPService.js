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

export const GRDPService = {
    getAll: async () => {
        const data = await getAllData(DATA_TYPES.GRDP);
        return data;
    },
    create: async ({
        growth_rate,
        info_year,
        province_code,
        create_by
    }) => {
        try {
            const data = await CUSTOM_AXIOS.POST({
                url: API_URL_INFO.GRDP_CREATE,
                body: {
                    growth_rate: Number(growth_rate),
                    info_year: Number(info_year),
                    province_code,
                    create_by,
                    unit_code: "PERC",
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
            console.log("Error when GRDPService CREARE: ", error);
            return {
                success: false,
                message: errorTextCommon,
            };
        }
    },
    update: async ({
        growth_rate,
        id,
        info_year,
        province_code,
        update_by,
    }) => {
        try {
            const data = await CUSTOM_AXIOS.POST({
                url: API_URL_INFO.GRDP_UPDATE,
                body: {
                    growth_rate: Number(growth_rate),
                    id: Number(id),
                    info_year: Number(info_year),
                    province_code,
                    unit_code: "PERC",
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
            console.log("Error when GRDPService update: ", error);
            return {
                success: false,
                message: errorTextCommon,
            };
        }
    },
    delete: async ({
        id
    }) => {
        try {
            const data = await CUSTOM_AXIOS.POST({
                url: API_URL_INFO.GRDP_DELETE,
                body: {
                    id: Number(id),
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
            console.log("Error when GRDPService delete: ", error);
            return {
                success: false,
                message: errorTextCommon,
            };
        }
    },
};