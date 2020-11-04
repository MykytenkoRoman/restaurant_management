import axios from "axios";
import { API_URL } from "../utils/constants";
import { omitBy, isNil } from 'lodash';
import { tokenHeader, responseError } from './common';

export const fetchUsers = async (params = {}) => {
  try {
    params = omitBy(params, isNil);
    const query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");
    const response = await axios.get(`${API_URL}/users/?${query}`, tokenHeader());
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const fetchUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`, tokenHeader());

    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const createUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/users`, data, tokenHeader());
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const updateUser = async (userId, data) => {
  try {
    const response = await axios.patch(
      `${API_URL}/users/${userId}`,
      data,
      tokenHeader()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`, tokenHeader());
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await axios.patch(`${API_URL}/users/me`, data, tokenHeader());
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};
