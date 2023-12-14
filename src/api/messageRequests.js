import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

export const getMessages = (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return API.get(`/message/${id}`, { headers: { token } });
};

export const addMessage = (formData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return API.post(`/message`, formData, { headers: { token } });
};

export const deleteUser = (messageId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return API.delete(`/message/:${messageId}`, { headers: { token } });
};
// export const updateUser = (id, formData) => {
//   const token = JSON.parse(localStorage.getItem("token"));
//   API.put(`/user/:${id}`, formData, { headers: { token } });
// };
