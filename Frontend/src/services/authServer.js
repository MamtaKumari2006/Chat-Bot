import api from "./axios";

const AUTH_BASE = "/api/auth";

// register user
export const registerUser = async (userData) => {
  try {
    const res = await api.post(`${AUTH_BASE}/register`, userData);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// login user
export const loginUser = async (userData) => {
  try {
    const res = await api.post(`${AUTH_BASE}/login`, userData);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// logout user
export const logoutUser = async () => {
  try {
    const res = await api.post(`${AUTH_BASE}/logout`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// get current user
export const getCurrentUser = async () => {
  try {
    const res = await api.get(`${AUTH_BASE}/current`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};