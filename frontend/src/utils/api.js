import axios from "axios";
import { API_URL } from "./constants";

export const tokenHeader = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const header = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  return header;
};

export const getError = (e) => {
  if (e.response && e.response.status === 401) {
    logout();
  }
  const message = e.response ? e.response.data.message : e.message;
  return new Error(message);
}

export const logout = () => {
  localStorage.removeItem("auth");
};

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
