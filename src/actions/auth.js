import axios from "../utils/axiosConfig";

export const postLogin = async (data) => {
  const response = await axios.post("login", data);
  return response.data;
};

export const postRegister = async (data) => {
  const response = await axios.post("registration", data);
  return response.data;
};
