// main.js
import SlimSelect from 'slim-select';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchBreeds, fetchCatByBreed } from "./js/cat-api.js";

// Вибір DOM-елементів
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Функція для відображення інформації про кота
function displayCatInfo(catData) {
  catInfo.innerHTML = `
    <h2>${catData[0].breeds[0].name}</h2>
    <p>Description: ${catData[0].breeds[0].description}</p>
    <p>Temperament: ${catData[0].breeds[0].temperament}</p>
    <img src="${catData[0].url}" alt="${catData[0].breeds[0].name}" />
  `;
}

// Функція для обробки помилок
function handleError() {
  loader.classList.add('hidden');
  error.classList.remove('hidden');
}

// Обробник події для вибору породи кота
breedSelect.addEventListener('change', async (event) => {
  const selectedBreedId = event.target.value;
  try {
    // Покажемо завантажувач
    loader.classList.remove('hidden');
    error.classList.add('hidden');

    // Виклик функції для отримання інформації про кота за ідентифікатором породи
    const catData = await fetchCatByBreed(selectedBreedId);

    // Відобразимо інформацію про кота та приховаємо завантажувач
    displayCatInfo(catData);
    loader.classList.add('hidden');
  } catch (err) {
    console.error('Error fetching cat data:', err);
    // Обробка помилки
    handleError();
  }
});

// Виклик функції завантаження порід котів
loadBreeds();

// Запуск функції обробки помилок при закритті повідомлення про помилку
error.addEventListener('close', () => {
  error.classList.add('hidden');
});
