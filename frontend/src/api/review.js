import axios from "axios";
import { API_URL } from "./constants";


export const fetchReviews = async (params = {}) => {
  try {
    params = omitBy(params, isNil);
    const query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    const response = await axios.get(`${API_URL}/reviews?${query}`, tokenHeader());
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

export const fetchReview = async (reviewId) => {
  try {
    const response = await axios.get(
      `${API_URL}/reviews/${reviewId}`,
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

export const createReview = async (restaurantId, data) => {
  try {
    const response = await axios.post(
      `${API_URL}/restaurants/${restaurantId}/reviews`,
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

export const updateReview = async (reviewId, data) => {
  try {
    const response = await axios.patch(
      `${API_URL}/reviews/${reviewId}`,
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

export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/reviews/${reviewId}`,
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

export const replyToReview = async (reviewId, data) => {
  try {
    const response = await axios.post(
      `${API_URL}/reviews/${reviewId}/reply`,
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

export const updateReply = async (reviewId, data) => {
  try {
    const response = await axios.patch(
      `${API_URL}/reviews/${reviewId}/reply`,
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

export const deleteReply = async (reviewId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/reviews/${reviewId}/reply`,
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
