import * as model from '../model.js';
import { DOGS_LIST, TOP__DOGS, PAGINATION_CONTAINER } from '../config.js';
import { generateMarkup, getImgUrl } from './view.js';
import {
  showPaginationMarkup,
  getSearchResultsPage,
} from './paginationView.js';

// ==========================================================================
// SELECT VIEW
// ==========================================================================

// show popular or dangerous breeds
export async function showTopDogs(array = model.state.popular) {
  const searchResultsPage = await getSearchResultsPage(array);

  model.state.dogs = searchResultsPage;
  await generateMarkup(model.state.dogs);
  await getImgUrl(model.state.dogs);
  DOGS_LIST.classList.remove('centered--one');
  showPaginationMarkup(model.state.dogs);
}

// show sorted dogs
async function showSortedDogs() {
  const fetchedData = await model.state.temporary;
  const { value } = TOP__DOGS;

  if (value === 'largest') {
    model.state.filteredData = await fetchedData
      .sort((a, b) => +b.height.slice(-2) - +a.height.slice(-2))
      .slice(0, 60);
  }

  if (value === 'smallest') {
    model.state.filteredData = await fetchedData
      .sort((a, b) => +a.height.slice(-2) - +b.height.slice(-2))
      .slice(0, 60);
  }

  if (value === 'longest-living') {
    model.state.filteredData = await fetchedData
      .sort((a, b) =>
        +a.life_span.split(' years').join(' ').trim().slice(-2) <
        +b.life_span.split(' years').join(' ').trim().slice(-2)
          ? 1
          : -1
      )
      .slice(0, 60);
  }

  if (value === 'shortest-living') {
    model.state.filteredData = await fetchedData
      .sort((a, b) =>
        +a.life_span.split(' years').join(' ').trim().slice(-2) <
        +b.life_span.split(' years').join(' ').trim().slice(-2)
          ? -1
          : 1
      )
      .slice(0, 60);
  }

  showPaginationMarkup(model.state.filteredData);

  const searchResultsPage = await getSearchResultsPage(
    model.state.filteredData
  );

  model.state.dogs = searchResultsPage;

  generateMarkup(model.state.dogs);
  getImgUrl(model.state.dogs);
}

// check selected sort option
export function showSelectedSortOption(e) {
  const { value } = e.target;
  model.state.dogs = [];
  DOGS_LIST.textContent = '';
  PAGINATION_CONTAINER.textContent = '';
  if (value === 'popularity') {
    showTopDogs(model.state.popular);
  } else if (value === 'dangerous') {
    showTopDogs(model.state.dangerous);
  } else {
    showSortedDogs();
  }
}
