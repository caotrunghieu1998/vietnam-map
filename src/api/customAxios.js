import axios from "axios";

export const CUSTOM_AXIOS = {
    // GET
    GET: async ({ url, params = {} }) => {
        try {
            const response = await axios.get(url, {
                params,
                timeout: 30000 // 30 giây
            });
            return response.data;
        } catch (error) {
            throw new Error("Đã có lỗi xảy ra trong quá trình xử lý data");
        }
    },
    POST: async ({ url, body = {} }) => {
        try {
            const response = await axios.post(url, body, {
                timeout: 30000 // 30 giây
            });
            return response.data;
        } catch (error) {
            throw new Error("Đã có lỗi xảy ra trong quá trình xử lý data");
        }
    }
};