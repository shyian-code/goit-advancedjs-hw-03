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
  <div class="cat-info-wrapper">
    <img class="cat-image" src="${catData[0].url}" alt="${catData[0].breeds[0].name}" />
    <div class="text-wrapper">
      <h2 class="info-title">${catData[0].breeds[0].name}</h2>
      <p><span>Description:</span> ${catData[0].breeds[0].description}</p>
      <p><span>Temperament:</span> ${catData[0].breeds[0].temperament}</p>
      <p><span>Country:<span> ${catData[0].breeds[0].origin}</p>
    </div>
  </div> 
  `;
}

// Функція для обробки помилок
function handleError() {
  loader.classList.add('hidden');
  error.classList.remove('hidden');
}

// Функція для опрацювання стану завантаження
function handleLoadingState(isLoading) {
  const customLoader = document.querySelector('.custom-loader');
  
  if (isLoading) {
    breedSelect.classList.add('hidden');
    catInfo.classList.add('hidden');
    customLoader.style.display = 'flex'; // Показати завантажувач
    error.classList.add('hidden');
  } else {
    breedSelect.classList.remove('hidden');
    catInfo.classList.remove('hidden');
    customLoader.style.display = 'none'; // Приховати завантажувач
  }
}

// Функція для завантаження порід котів
async function loadBreeds() {
  try {
    const breeds = await fetchBreeds();
    // Додати породи до випадаючого списку
    breeds.forEach((breed) => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (err) {
    console.error('Error loading breeds:', err);
  }
}

// Обробник події для вибору породи кота
breedSelect.addEventListener('change', async (event) => {
  const selectedBreedId = event.target.value;
  try {
    // Покажемо завантажувач перед виконанням запиту
    handleLoadingState(true);

    // Виклик функції для отримання інформації про кота за ідентифікатором породи
    const catData = await fetchCatByBreed(selectedBreedId);

    // Відобразимо інформацію про кота
    displayCatInfo(catData);

    // Приховаємо завантажувач після завершення запиту
    handleLoadingState(false);
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