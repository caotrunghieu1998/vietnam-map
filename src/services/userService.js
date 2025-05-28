import { API_URL_INFO, MY_UUID } from "../api/URLS";
import { CUSTOM_AXIOS } from "../api/customAxios";

const sampleDataReturn = {
    isSuccess: true,
    data: null,
    errorMessage: '',
};

const errorTextCommon = "Đã có lỗi xảy ra";

export const USER_VERVICE = {
    userLogin: async ({ username, password }) => {
        const dataReturn = { ...sampleDataReturn };
        try {
            const data = await CUSTOM_AXIOS.GET(
                {
                    url: API_URL_INFO.USER_LOGIN,
                    params: {
                        username,
                        password,
                        device_uuid: MY_UUID,
                    }
                });

            if (data.status === 200) {
                dataReturn.isSuccess = true;
                dataReturn.data = data.data;
            } else {
                dataReturn.errorMessage = data.message || errorTextCommon;
            }
        } catch (error) {
            dataReturn.errorMessage = error.message;
        } finally {
            return dataReturn;
        }
    },
    getUserByUserName: async () => {
        const dataReturn = { ...sampleDataReturn };
        try {
            const username = localStorage.getItem('username');
            if (!username) {
                dataReturn.isSuccess = false;
                dataReturn.errorMessage = errorTextCommon;
                return dataReturn;
            }
            const data = await CUSTOM_AXIOS.GET(
                {
                    url: API_URL_INFO.GET_USER_BY_USER_NAME,
                    params: {
                        username,
                    }
                });

            if (data.status === 200) {
                dataReturn.isSuccess = true;
                dataReturn.data = data.data;
            } else {
                dataReturn.errorMessage = data.message || errorTextCommon;
            }
        } catch (error) {
            dataReturn.errorMessage = error.message;
        } finally {
            return dataReturn;
        }
    },
    userLogout: async () => {
        try {
            await CUSTOM_AXIOS.GET(
                {
                    url: API_URL_INFO.USER_LOGOUT,
                });
            localStorage.removeItem('username');
        } catch (error) {
            console.error(error);
        } finally {
            localStorage.removeItem('username');
        }
    },
    userChangePassword: async ({
        password_old,
        password_new,
        re_password_new,
        username,
    }) => {
        try {
            const data = await CUSTOM_AXIOS.POST({
                url: API_URL_INFO.USER_CHANGE_PASSWORD,
                body: {
                    password_old,
                    password_new,
                    re_password_new,
                    username,
                }
            });
            if (data?.status === 200 && data?.data) {
                return {
                    success: true,
                    message: data?.message || "",
                }
            }
            return {
                success: false,
                message: data?.message || errorTextCommon,
            }

        } catch (error) {
            console.error("Error when userChangePassword: ", error);
            return {
                success: false,
                message: errorTextCommon,
            }
        }
    },
};