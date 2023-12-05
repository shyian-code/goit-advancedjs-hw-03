// main.js
import SlimSelect from 'slim-select';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchBreeds, fetchCatByBreed } from "./js/cat-api.js";

const breedSelect = document.querySelector("select.breed-select");
const catInfoDiv = document.querySelector("div.cat-info");
const loader = document.querySelector("p.loader");
const errorDiv = document.querySelector("p.error");


// const slimSelect = new SlimSelect({
//   select: breedSelect,
//   settings: {
//     placeholderText: 'Search breeds',
//   },
// });

// використання iziToast
iziToast.success({
  title: "Success",
  message: "Operation completed successfully",
});


function showLoader() {
  loader.classList.add("visible");
  breedSelect.classList.add("hidden"); // Приховати select.breed-select
  catInfoDiv.classList.add("hidden"); // Приховати div.cat-info
}

function hideBreedSelect() {
  breedSelect.classList.add("hidden");
}

function hideLoader() {
  loader.classList.remove("visible");
}

function showBreedSelect() {
  breedSelect.classList.remove("hidden");
}

function hideCatInfo() {
  catInfoDiv.classList.add("hidden");
}

function showCatInfo() {
  catInfoDiv.classList.remove("hidden");
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

function displayCatInfo(cat, origin, country_code, noImage) {
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
      <h2 class="info-title">${breedName.textContent}</h2>
      <p><b class="primary">Description:</b> ${description.textContent}</p>
      <p><b class="primary">Temperament:</b> ${temperament.textContent}</p>
      <div>
        <p><b class="primary">Country:</b> ${origin}</p>
        <img class="cat-img" width="400" src="${countryImg.src}" alt="${countryImg.alt}">
      </div>
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
    showBreedSelect(); // Показати select.breed-select
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
    hideBreedSelect(); // Приховати select.breed-select

    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        hideLoader();
        displayCatInfo(cat);
      })
      .catch(() => {
        hideLoader();
        showError();
      });
  }
});
