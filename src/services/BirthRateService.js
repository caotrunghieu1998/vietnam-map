import { DATA_TYPES, getAllData } from "./common";

export const BirthRateService = {
    getAll: async () => {
        const data = await getAllData(DATA_TYPES.BIRTH_RATE);
        return data;
    },
};