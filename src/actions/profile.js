import axios from "../utils/axiosConfig";

export const getProfile = async () => {
  try {
    const response = await axios.get("profile");
    if (response.data.status === 0) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(error.message || "Error fetching profile");
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await axios.put("profile/update", data);

    if (response.data.status === 0) {
      return response?.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile"
    );
  }
};

export const updateProfileImage = async (formData) => {
  try {
    const response = await axios.put("profile/image", formData);

    if (response.data.status === 0) {
      return response?.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile image"
    );
  }
};
