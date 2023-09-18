import axios from "axios";
import { structureUserData } from "./validation";

let BASE_URL = "";

export const saveUser = async (userData) => {
  try {
    const structuredData = structureUserData(userData);
    const response = await axios.post(`${BASE_URL}/user`, structuredData);
    return response;
  } catch (error) {
    -console.error(
      "Error saving user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    const structuredData = structureUserData(userData);
    const response = await axios.patch(
      `${BASE_URL}/user/${userData?.userId}`,
      structuredData
    );
    return response;
  } catch (error) {
    -console.error(
      "Error saving user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/user/${userId}`);
    return response;
  } catch (error) {
    console.error(
      "Error deleting user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getUsers = async (queryString) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/user${queryString ? "?" + queryString : ""}`
    );
    return response;
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
