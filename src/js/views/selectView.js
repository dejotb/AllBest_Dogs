import * as model from '../model.js';
import {
  DOGS_LIST,
  TOP__DOGS,
  LOADER,
  PAGINATION_CONTAINER,
} from '../config.js';

import { showDog } from '../controller.js';
import { showPaginationMarkup } from './paginationView.js';
import {
  generateMarkup,
  getImgUrl,
  createGridMarkup,
  fetchImgUrl,
} from './view.js';

export async function showPopularDogs() {
  const searchResultsPage = await model.getSearchResultsPage(
    model.state.popular
  );
  // model.state.dogs.push(...model.state.popular);

  // console.log(searchResultsPage);

  model.state.dogs = searchResultsPage;
  await generateMarkup(model.state.dogs);
  await getImgUrl(model.state.dogs);
  DOGS_LIST.classList.remove('centered--one');
}

async function showTopDogs() {
  const fetchedData = await model.state.temporary;
  const { value } = TOP__DOGS;

  // let filteredData;

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

  // console.log(model.state.filteredData);

  // ??? here insert pagination function

  showPaginationMarkup(model.state.filteredData);

  const searchResultsPage = await model.getSearchResultsPage(
    model.state.filteredData
  );

  // console.log(searchResultsPage);

  model.state.dogs = searchResultsPage;

  // console.log(model.state.dogs);

  generateMarkup(model.state.dogs);
  getImgUrl(model.state.dogs);
  DOGS_LIST.classList.remove('centered--one');
}

export function showSelectedTopDogs(e) {
  const { value } = e.target;
  model.state.dogs = [];
  DOGS_LIST.textContent = '';
  PAGINATION_CONTAINER.textContent = '';
  if (value === 'popularity') {
    showPopularDogs();
  } else {
    showTopDogs();
  }
}
