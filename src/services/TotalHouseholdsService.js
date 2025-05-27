import { DATA_TYPES, getAllData } from "./common";

export const TotalHouseholdsService = {
    getAll: async () => {
        const data = await getAllData(DATA_TYPES.TOTAL_HOUSEHOLDS);
        return data;
    },
};