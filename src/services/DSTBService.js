import { DATA_TYPES, getAllData } from "./common";

export const DSTBService = {
    getAll: async () => {
        const data = await getAllData(DATA_TYPES.DSTB);
        return data;
    },
};