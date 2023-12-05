// main.js
import SlimSelect from 'slim-select';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchBreeds, fetchCatByBreed } from "./js/cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const catInfoDiv = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

// Створюємо SlimSelect для стилізації селекту
const slim = new SlimSelect({
  select: ".breed-select"
});

// Заповнюємо селект порід при завантаженні сторінки
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const breeds = await fetchBreeds();

    // Очищаємо та оновлюємо опції у SlimSelect
    slim.setData(breeds.map(breed => ({ text: breed.name, value: breed.id })));

  } catch (error) {
    console.error("Помилка отримання порід:", error);
  }
});

// Обробка події вибору породи
breedSelect.addEventListener("change", async () => {
  const selectedBreedId = breedSelect.value;
  try {
    showLoader();
    hideError();
    const catData = await fetchCatByBreed(selectedBreedId);
    displayCatInfo(catData);
  } catch (error) {
    hideLoader();
    showError();
    console.error("Помилка отримання інформації про кота:", error);
  }
});

// Функція для відображення інформації про кота
const displayCatInfo = (catData) => {
  const cat = catData[0];
  const image = cat.url;
  const breedName = cat.breeds[0].name;
  const description = cat.breeds[0].description;
  const temperament = cat.breeds[0].temperament;

  // Відображаємо зображення та інформацію про кота
  const catImage = document.createElement("img");
  catImage.src = image;
  catInfoDiv.innerHTML = `
    <div>
      <h3>${breedName}</h3>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Temperament:</strong> ${temperament}</p>
    </div>
  `;
  catInfoDiv.appendChild(catImage);

  hideLoader();
  catInfoDiv.style.display = "block";
};
