import axios from "axios";
import { API_URL } from "../utils/constants";
import { omitBy, isNil } from 'lodash';
import { tokenHeader, responseError } from './common';

export const fetchReviews = async (params = {}) => {
  try {
    params = omitBy(params, isNil);
    const query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    const response = await axios.get(`${API_URL}/reviews?${query}`, tokenHeader());
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const fetchReviewsForRestaurant = async (restaurantId, params = {}) => {
  try {
    params = omitBy(params, isNil);
    const query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    const response = await axios.get(
      `${API_URL}/restaurants/${restaurantId}/reviews?${query}`,
      tokenHeader()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const fetchPendingReviews = async (params = {}) => {
  try {
    params = omitBy(params, isNil);
    const query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    const response = await axios.get(
      `${API_URL}/reviews/pending?${query}`,
      tokenHeader()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const fetchReview = async (reviewId) => {
  try {
    const response = await axios.get(
      `${API_URL}/reviews/${reviewId}`,
      tokenHeader()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const createReview = async (restaurantId, data) => {
  try {
    const response = await axios.post(
      `${API_URL}/restaurants/${restaurantId}/reviews`,
      data,
      tokenHeader()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const updateReview = async (reviewId, data) => {
  try {
    const response = await axios.patch(
      `${API_URL}/reviews/${reviewId}`,
      data,
      tokenHeader()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/reviews/${reviewId}`,
      tokenHeader()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const replyToReview = async (reviewId, data) => {
  try {
    const response = await axios.post(
      `${API_URL}/reviews/${reviewId}/reply`,
      data,
      tokenHeader()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const updateReply = async (reviewId, data) => {
  try {
    const response = await axios.patch(
      `${API_URL}/reviews/${reviewId}/reply`,
      data,
      tokenHeader()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const deleteReply = async (reviewId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/reviews/${reviewId}/reply`,
      tokenHeader()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};
