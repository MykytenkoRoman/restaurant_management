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
