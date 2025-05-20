import axios from 'axios';

// Lấy URL và API Key từ biến môi trường
const API_URL = 'https://jsonplaceholder.typicode.com/users';
const API_KEY = process.env.REACT_APP_API_KEY;

// Lấy danh sách nhân viên
export const validateUser = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách nhân viên:', error);
    throw error;
  }
};

// Lấy chi tiết một nhân viên
export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer 123456789abcdef`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy chi tiết nhân viên với ID: ${id}`, error);
    throw error;
  }
};
