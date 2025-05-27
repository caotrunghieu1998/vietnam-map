import { DATA_TYPES, getAllData } from "./common";

export const ProInfoService = {
    getAll: async () => {
        const data = await getAllData(DATA_TYPES.PRO_INFO);
        return data;
    },
};