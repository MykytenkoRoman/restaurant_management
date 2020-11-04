import axios from "axios";
import { API_URL } from "../utils/constants";
import { omitBy, isNil } from 'lodash';
import { tokenHeader, responseError } from './common';

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
    return response.data;
  } catch (e) {
    return responseError(e);
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
    return response.data;
  } catch (e) {
    return responseError(e);
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
    return response.data;
  } catch (e) {
    return responseError(e);
  }
};

export const fetchRestaurant = async (restaurantId) => {
  try {
    const response = await axios.get(
      `${API_URL}/restaurants/${restaurantId}`,
      tokenHeader()
    );
    return response.data;
  } catch (e) {
    return responseError(e);
  }
};

export const createRestaurant = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/restaurants`, data, tokenHeader());
    return response.data;
  } catch (e) {
    return responseError(e);
  }
};

export const updateRestaurant = async (restaurantId, data) => {
  try {
    const response = await axios.patch(
      `${API_URL}/restaurants/${restaurantId}`,
      data,
      tokenHeader()
    );
    return response.data;
  } catch (e) {
    return responseError(e);
  }
};

export const deleteRestaurant = async (restaurantId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/restaurants/${restaurantId}`,
      tokenHeader()
    );
    return response.data;
  } catch (e) {
    return responseError(e);
  }
};
