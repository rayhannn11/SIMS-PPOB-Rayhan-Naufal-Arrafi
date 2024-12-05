import axios from "../utils/axiosConfig";

export const getBalance = async () => {
  try {
    const response = await axios.get("balance");
    if (response.data.status === 0) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(error.message || "Error fetching balance");
  }
};

export const postTopUp = async (data) => {
  try {
    const response = await axios.post("topup", data);
    if (response.data.status === 0) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(error.message || "Error Post Top Up");
  }
};

export const getTransaction = async (limit = 0, offset = 0) => {
  try {
    const response = await axios.get(`transaction/history`, {
      params: {
        offset,
        limit: limit.limit, // Parameter limit opsional
      },
    });
    if (response.data.status === 0) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(error.message || "Error fetching balance");
  }
};

export const postTransaction = async (data) => {
  try {
    const response = await axios.post("transaction", data);
    if (response.data.status === 0) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(error.message || "Error Post Payment");
  }
};
