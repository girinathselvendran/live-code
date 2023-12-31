import axios from "axios";

// export const API = "http://localhost:5000";
export const API = "https://live-code-api.onrender.com";

export const createUser = (data: any) => {
  return axios.post(`${API}/api/create-user`, data);
};

export const userLogin = (data: any) => {
  return axios.post(`${API}/api/login-user`, data);
};
