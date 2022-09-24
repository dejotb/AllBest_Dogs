import * as model from './model.js';
import { generateMarkup, getImgUrl, generateDogCard } from './views/view.js';
import {
  DOGS_LIST,
  AUTOCOMPLETE_INPUT,
  BTN_HAMBURGER,
  BASKET_WRAPPER,
  PAGINATION_CONTAINER,
} from './config.js';
import { tempDisableEvents } from './helpers.js';
// import { showAlertText } from './views/alertView.js';
import alert from './views/alertView.js';
import { showPaginationMarkup } from './views/paginationView.js';

export async function showDog(breed) {
  await model.fetchDogsData(breed);

  // const allFoundBreeds = model.state.dogs;
  // console.log(allFoundBreeds);

  const { dogs } = model.state;

  await generateMarkup(dogs);

  await getImgUrl(dogs);

  model.state.dogs = [];
  DOGS_LIST.textContent = '';
  PAGINATION_CONTAINER.textContent = '';

  showPaginationMarkup(model.state.filteredData);

  const searchResultsPage = await model.getSearchResultsPage(
    model.state.filteredData
  );

  // console.log(searchResultsPage);

  model.state.dogs = searchResultsPage;

  // console.log(model.state.dogs);

  generateMarkup(model.state.dogs);
  getImgUrl(model.state.dogs);
  // DOGS_LIST.classList.remove('centered--one');
}

export function fetchDog(e) {
  e.preventDefault();
  DOGS_LIST.classList.remove('centered--one');
  DOGS_LIST.classList.remove('centered--two');
  const dogsInput = document.querySelector('#dogs__input');

  if (dogsInput.value.length < 3) {
    const markup = `String has to be atleast 3️⃣ characters.`;
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
  console.log(selectedDog);

  const likedDog = model.state.likedDogs.find((dog) => dog.id === +selectedDog);

  console.log(likedDog);
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
  // render new results
  // model.state.dogs = [];
  DOGS_LIST.textContent = '';
  // render new pagination buttons

  // console.log(model.state.filteredData);

  const searchResultsPage = model.getSearchResultsPage(
    model.state.filteredData,
    goToPage
  );

  model.state.dogs = searchResultsPage; // dotąd jest git

  PAGINATION_CONTAINER.textContent = '';
  showPaginationMarkup(model.state.filteredData, goToPage);

  // console.log(searchResultsPage);

  // console.log(model.state.dogs);

  generateMarkup(model.state.dogs);
  getImgUrl(model.state.dogs);
  DOGS_LIST.classList.remove('centered--one');
}
