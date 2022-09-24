import * as model from '../model.js';
import { DOGS_LIST, TOP__DOGS, LOADER } from '../config.js';

import { showDog } from '../controller.js';
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
  const { value = 'alpa' } = TOP__DOGS;

  // console.log(fetchedData);
  let filteredData;

  if (value === 'alphabetically-a-z') {
    // filteredData = await fetchedData.filter(
    //   (dog) => +dog.height.slice(-2) >= 70
    // );
    // .slice(0, 30);

    filteredData = await fetchedData
      .sort((a, b) => a.name - b.name)
      .slice(0, 60);
  }
  if (value === 'alphabetically-z-a') {
    // filteredData = await fetchedData.filter(
    //   (dog) => +dog.height.slice(-2) >= 70
    // );
    // .slice(0, 30);
    filteredData = await fetchedData
      .reverse((a, b) => a.name - b.name)
      .slice(0, 60);
  }
  if (value === 'largest') {
    // filteredData = await fetchedData.filter(
    //   (dog) => +dog.height.slice(-2) >= 70
    // );
    // .slice(0, 30);

    filteredData = await fetchedData
      .sort((a, b) => +b.height.slice(-2) - +a.height.slice(-2))
      .slice(0, 60);
  }

  if (value === 'smallest') {
    // filteredData = await fetchedData
    //   .filter((dog) => +dog.height.slice(-2) < 29)
    //   .slice(0, 30);

    filteredData = await fetchedData
      .sort((a, b) => +a.height.slice(-2) - +b.height.slice(-2))
      .slice(0, 60);
  }

  if (value === 'longest-living') {
    // filteredData = await fetchedData.filter((dog) =>
    //   console.log(+dog.life_span.split(' years').join(' ').trim().slice(-2))
    // );
    // .slice(0, 30);

    filteredData = await fetchedData
      .sort((a, b) =>
        +a.life_span.split(' years').join(' ').trim().slice(-2) <
        +b.life_span.split(' years').join(' ').trim().slice(-2)
          ? 1
          : -1
      )
      .slice(0, 60);
  }

  if (value === 'shortest-living') {
    filteredData = await fetchedData
      .sort((a, b) =>
        +a.life_span.split(' years').join(' ').trim().slice(-2) <
        +b.life_span.split(' years').join(' ').trim().slice(-2)
          ? -1
          : 1
      )
      .slice(0, 60);

    // filteredData = await fetchedData.sort((a, b) =>
    //   +a.life_span.split(' years').join(' ').trim().slice(-2) <
    //   +b.life_span.split(' years').join(' ').trim().slice(-2)
    //     ? 1
    //     : -1
    // );
    console.log(filteredData);
  }

  console.log(filteredData);
  const searchResultsPage = await model.getSearchResultsPage(filteredData);

  // console.log(searchResultsPage);

  model.state.dogs = searchResultsPage;

  console.log(model.state.dogs);

  generateMarkup(model.state.dogs);
  getImgUrl(model.state.dogs);
  DOGS_LIST.classList.remove('centered--one');
}

export function showSelectedTopDogs(e) {
  const { value } = e.target;
  model.state.dogs = [];
  DOGS_LIST.textContent = '';
  if (value === 'popularity') {
    showPopularDogs();
  } else {
    showTopDogs();
  }
}
