import axios from "axios";
import { API_URL } from "./constants";

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, data);
    localStorage.setItem("auth", JSON.stringify(response.data));
    return response.data;
  } catch (e) {
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, data);
    localStorage.setItem("auth", JSON.stringify(response.data));
    return response.data;
  } catch (e) {
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};
