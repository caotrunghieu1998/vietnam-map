import { DATA_TYPES, getAllData } from "./common";

export const PopAgeService = {
    getAll: async () => {
        const data = await getAllData(DATA_TYPES.POP_AGE);
        return data;
    },
};