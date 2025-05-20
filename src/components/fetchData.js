import axios from "axios";

export const fetchData = async (url) => {
  try {
    const token = localStorage.getItem("access_token"); // Lấy token từ localStorage
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`, // Thêm Bearer token vào header
      },
      maxRedirects: 0, // Giới hạn redirect
    });
    return response.data; // Trả về dữ liệu
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    throw error; // Ném lỗi để xử lý sau
  }
};
