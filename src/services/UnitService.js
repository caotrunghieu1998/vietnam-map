import { DATA_TYPES, getAllData } from "./common";

export const UnitService = {
    getAll: async () => {
        const data = await getAllData(DATA_TYPES.UNIT);
        return data;
    },
};