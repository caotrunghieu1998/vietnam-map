import { DATA_TYPES, getAllData } from "./common";

export const AgingIndexService = {
    getAll: async () => {
        const data = await getAllData(DATA_TYPES.AGING_INDEX);
        return data;
    },
};