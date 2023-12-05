// cat-api.js
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_8dopgEoZqjLeDX5BcU4nL2k4qRgKONIXj7FAVN0qokHbLiZxLlebiy9Al26Wgzgs";

// Функція для отримання інформації про породи котів
export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Функція для отримання інформації про кота за ідентифікатором породи
export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}