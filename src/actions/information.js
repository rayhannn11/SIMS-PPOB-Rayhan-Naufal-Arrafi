import axios from "../utils/axiosConfig";

export const getServices = async () => {
  try {
    const response = await axios.get("services");
    if (response.data.status === 0) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(error.message || "Error fetching balance");
  }
};

export const getBanner = async () => {
  try {
    const response = await axios.get("banner");
    if (response.data.status === 0) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(error.message || "Error fetching balance");
  }
};
