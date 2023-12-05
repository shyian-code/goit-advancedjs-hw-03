// main.js
import SlimSelect from 'slim-select';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchBreeds, fetchCatByBreed } from "./js/api.js";

const breedSelect = document.querySelector("select.breed-select");
const catInfoDiv = document.querySelector("div.cat-info");
const loader = document.querySelector("p.loader");
const errorDiv = document.querySelector("p.error");


// використання iziToast
iziToast.success({
  title: "Success",
  message: "Operation completed successfully",
});


function showLoader() {
  loader.classList.add("visible");
}

function hideLoader() {
  loader.classList.remove("visible");
}

function showError() {
  errorDiv.classList.add("visible");
}

function hideError() {
  errorDiv.classList.remove("visible");
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

function showCatInfo(cat, origin, country_code, noImage) {
  const img = document.createElement("img");
  img.src = cat[0].url;
  img.alt = `${cat[0].breeds[0].name}`;

  const breedName = document.createElement("p");
  breedName.textContent = `Breed: ${cat[0].breeds[0].name}`;

  const description = document.createElement("p");
  description.textContent = `Description: ${cat[0].breeds[0].description}`;

  const temperament = document.createElement("p");
  temperament.textContent = `Temperament: ${cat[0].breeds[0].temperament}`;

  const countryImg = document.createElement("img");
  countryImg.src = `https://flagsapi.com/${country_code}/shiny/64.png`;
  countryImg.alt = `${origin}`;
  countryImg.onerror = () => {
    countryImg.src = noImage;
  };
  countryImg.style.width = "64px";

  const wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("wrapper");
  wrapperDiv.innerHTML = `
    <img class="cat-img" width="400" src="${img.src}" alt="${img.alt}">
    <div class="info-wrap">
      <h2 class="text">${breedName.textContent}</h2>
      <p><b class="primary">Description:</b> ${description.textContent}</p>
      <p><b class="primary">Temperament:</b> ${temperament.textContent}</p>
      <p><b class="primary">Country:</b> ${origin}</p>
    </div>
  `;

  wrapperDiv.appendChild(countryImg);
  catInfoDiv.innerHTML = "";
  catInfoDiv.appendChild(wrapperDiv);
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
