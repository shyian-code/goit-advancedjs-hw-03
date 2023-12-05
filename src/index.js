// main.js
import SlimSelect from 'slim-select';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchBreeds, fetchCatByBreed } from "./js/cat-api.js";

const catInfoDiv = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const breedSelect = document.querySelector(".breed-select");

breedSelect.addEventListener("change", async () => {
  const selectedBreedId = breedSelect.value;
  try {
    loader.style.display = "block";
    catInfoDiv.style.display = "none";
    const catData = await fetchCatByBreed(selectedBreedId);
    // Відобразити інформацію про кота
    loader.style.display = "none";
    catInfoDiv.style.display = "block";
  } catch (error) {
    loader.style.display = "none";
    error.style.display = "block";
    console.error("Помилка отримання інформації про кота:", error);
  }
});


const populateBreeds = async () => {
  try {
    const breeds = await fetchBreeds();
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Помилка отримання порід:", error);
  }
};

populateBreeds();