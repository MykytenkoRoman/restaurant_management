import axios from "axios";
import { API_URL } from "./constants";

export const fetchRestaurants = async (params = {}) => {
  try {
    params = omitBy(params, isNil);
    const query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    const response = await axios.get(
      `${API_URL}/restaurants?${query}`,
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

export const fetchOwnedRestaurants = async (params = {}) => {
  try {
    params = omitBy(params, isNil);
    const query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    const response = await axios.get(
      `${API_URL}/restaurants/owned?${query}`,
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

export const fetchRestaurantUsers = async (restaurantId, params = {}) => {
  try {
    params = omitBy(params, isNil);
    const query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");
    const response = await axios.get(
      `${API_URL}/restaurants/${restaurantId}/users?${query}`,
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

export const fetchRestaurant = async (restaurantId) => {
  try {
    const response = await axios.get(
      `${API_URL}/restaurants/${restaurantId}`,
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

export const createRestaurant = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/restaurants`, data, tokenHeader());
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

export const updateRestaurant = async (restaurantId, data) => {
  try {
    const response = await axios.patch(
      `${API_URL}/restaurants/${restaurantId}`,
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

export const deleteRestaurant = async (restaurantId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/restaurants/${restaurantId}`,
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
