import * as model from './model.js';
import {
  DOGS_LIST,
  AUTOCOMPLETE_INPUT,
  BTN_HAMBURGER,
  BASKET_WRAPPER,
  PAGINATION_CONTAINER
} from './config.js';
import { generateMarkup, getImgUrl, generateDogCard,  } from './views/view.js';
import { generateDogCard } from './views/modalView.js';
import alert from './views/alertView.js';
import { showPaginationMarkup, getSearchResultsPage, } from './views/paginationView.js';

import { tempDisableEvents } from './helpers.js';

// ==========================================================================
// CONTROLLER
// ==========================================================================

export async function showDog(breed) {
  await model.fetchDogsData(breed);

  const { dogs } = model.state;

  await generateMarkup(dogs);

  await getImgUrl(dogs);

  model.state.dogs = [];
  DOGS_LIST.textContent = '';
  PAGINATION_CONTAINER.textContent = '';

  showPaginationMarkup(model.state.filteredData);

  const searchResultsPage = await getSearchResultsPage(
    model.state.filteredData
  );

  model.state.dogs = searchResultsPage;

  generateMarkup(model.state.dogs);
  getImgUrl(model.state.dogs);
}

export function fetchDog(e) {
  e.preventDefault();
  DOGS_LIST.classList.remove('centered--one');
  DOGS_LIST.classList.remove('centered--two');
  const dogsInput = document.querySelector('#dogs__input');

  if (dogsInput.value.length < 3) {
    const markup = `String has to have atleast 3️⃣ characters.`;
    alert(markup);
    return;
  }
  DOGS_LIST.textContent = '';
  AUTOCOMPLETE_INPUT.classList.remove('active');
  showDog(dogsInput.value);
  tempDisableEvents(e);
  dogsInput.value = '';
}

export function handleBasketItem(e) {
  const selectedDog = e.target.closest('.basket__item').dataset.id;
  const likedDog = model.state.likedDogs.find((dog) => dog.id === +selectedDog);
  generateDogCard(likedDog);
}

export function handleBasketVisibility(e) {
  if (
    e.target !== BTN_HAMBURGER &&
    BTN_HAMBURGER.getAttribute('aria-expanded')
  ) {
    BTN_HAMBURGER.setAttribute('aria-expanded', 'false');
    BASKET_WRAPPER.classList.remove('visible');
    BTN_HAMBURGER.classList.remove('transparent');
  }
}

export function controlPagination(goToPage) {
  DOGS_LIST.textContent = '';
  const searchResultsPage = getSearchResultsPage(
    model.state.filteredData,
    goToPage
  );

  model.state.dogs = searchResultsPage;
  PAGINATION_CONTAINER.textContent = '';
  showPaginationMarkup(model.state.filteredData, goToPage);
  generateMarkup(model.state.dogs);
  getImgUrl(model.state.dogs);
  DOGS_LIST.classList.remove('centered--one');
}








