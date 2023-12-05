// cat-api.js
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_8dopgEoZqjLeDX5BcU4nL2k4qRgKONIXj7FAVN0qokHbLiZxLlebiy9Al26Wgzgs";

export const fetchBreeds = async () => {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};