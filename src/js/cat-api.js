// cat-api.js
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_8dopgEoZqjLeDX5BcU4nL2k4qRgKONIXj7FAVN0qokHbLiZxLlebiy9Al26Wgzgs";

export const fetchBreeds = async () => {
  try {
    showLoader();
    hideError();
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    hideLoader();
    return response.data;
  } catch (error) {
    hideLoader();
    showError();
    throw error;
  }
};

export const fetchCatByBreed = async (breedId) => {
  try {
    showLoader();
    hideError();
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    hideLoader();
    return response.data;
  } catch (error) {
    hideLoader();
    showError();
    throw error;
  }
};

const showLoader = () => {
  document.querySelector(".loader").style.display = "block";
};

const hideLoader = () => {
  document.querySelector(".loader").style.display = "none";
};

const showError = () => {
  document.querySelector(".error").style.display = "block";
};

const hideError = () => {
  document.querySelector(".error").style.display = "none";
};