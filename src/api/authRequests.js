import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

export const register = (formData) => API.post(`/auth/signup`, formData);
export const login = (formData) => API.post(`/auth/login`, formData);
