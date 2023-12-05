// main.js
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchBreeds, fetchCatByBreed } from "./js/api.js";

const breedSelect = document.querySelector("select.breed-select");
const catInfoDiv = document.querySelector("div.cat-info");
const loader = document.querySelector("p.loader");
const errorDiv = document.querySelector("p.error");


// ініціалізація SlimSelect
const slimSelect = new SlimSelect({
  select: breedSelect,
  placeholder: "Select a breed",
});

// використання iziToast
iziToast.success({
  title: "Success",
  message: "Operation completed successfully",
});


function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError() {
  errorDiv.style.display = "block";
}

function hideError() {
  errorDiv.style.display = "none";
}

function populateBreedSelect(breeds) {
  breedSelect.innerHTML = "";
  breeds.forEach(breed => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function showCatInfo(cat) {
  const img = document.createElement("img");
  img.src = cat[0].url;

  const breedName = document.createElement("p");
  breedName.textContent = `Breed: ${cat[0].breeds[0].name}`;

  const description = document.createElement("p");
  description.textContent = `Description: ${cat[0].breeds[0].description}`;

  const temperament = document.createElement("p");
  temperament.textContent = `Temperament: ${cat[0].breeds[0].temperament}`;

  catInfoDiv.innerHTML = "";
  catInfoDiv.appendChild(img);
  catInfoDiv.appendChild(breedName);
  catInfoDiv.appendChild(description);
  catInfoDiv.appendChild(temperament);
}

// Fetch breeds on page load
showLoader();
fetchBreeds()
  .then(breeds => {
    hideLoader();
    populateBreedSelect(breeds);
  })
  .catch(() => {
    hideLoader();
    showError();
  });

// Handle breed select change
breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    showLoader();
    hideError();

    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        hideLoader();
        showCatInfo(cat);
      })
      .catch(() => {
        hideLoader();
        showError();
      });
  }
});
