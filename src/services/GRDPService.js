import { DATA_TYPES, getAllData } from "./common";

export const GRDPService = {
    getAll: async () => {
        const data = await getAllData(DATA_TYPES.GRDP);
        return data;
    },
};