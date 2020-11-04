import axios from "axios";
import { API_URL } from "./constants";

export const fetchUsers = async (params = {}) => {
  try {
    params = omitBy(params, isNil);
    const query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");
    const response = await axios.get(`${API_URL}/users/?${query}`, tokenHeader());
    refreshToken();
    return response.data;
  } catch (e) {
    if (e.response && e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const fetchUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`, tokenHeader());
    refreshToken();
    return response.data;
  } catch (e) {
    if (e.response && e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const createUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/users`, data, tokenHeader());
    refreshToken();
    return response.data;
  } catch (e) {
    if (e.response && e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const updateUser = async (userId, data) => {
  try {
    const response = await axios.patch(
      `${API_URL}/users/${userId}`,
      data,
      tokenHeader()
    );
    refreshToken();
    return response.data;
  } catch (e) {
    if (e.response && e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`, tokenHeader());
    refreshToken();
    return response.data;
  } catch (e) {
    if (e.response && e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await axios.patch(`${API_URL}/users/me`, data, tokenHeader());
    refreshToken();
    return response.data;
  } catch (e) {
    if (e.response && e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};
