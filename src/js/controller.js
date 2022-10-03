import * as model from './model.js';
import {
  DOGS_LIST,
  MODAL_LIST,
  MODAL,
  PAGINATION_CONTAINER,
} from './config.js';
import { generateMarkup, getImgUrl } from './views/view.js';
import {
  showPaginationMarkup,
  getSearchResultsPage,
} from './views/paginationView.js';

// ==========================================================================
// CONTROLLER
// ==========================================================================

// show dog item
export async function showDogItem(breed) {
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

// hadnle pagination
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

// handle modal closing
export function controlModalClose(e) {
  if (
    e.target.querySelector('.modal__card') ||
    e.keyCode === 27 ||
    e.target.classList.contains('modal__button') ||
    e.target.classList.contains('modal__container')
  ) {
    MODAL_LIST.textContent = '';
    MODAL.classList.add('hidden');
    document.body.classList.remove('sticky__body');
    Array.from(DOGS_LIST.children).forEach((element) => {
      element.tabIndex = 0;
    });
    if (!MODAL.querySelector('.modal__filter')) return;
    MODAL.querySelector('.modal__filter').remove();
  }
}
