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
  model.state.dogs.push(...model.state.popular);
  await generateMarkup(model.state.dogs);
  await getImgUrl(model.state.dogs);
  DOGS_LIST.classList.remove('centered--one');
}

async function showTopDogs() {
  const fetchedData = await model.state.temporary;

  console.log(fetchedData);
  let filteredData;

  if (TOP__DOGS.value === 'largest') {
    filteredData = await fetchedData
      .filter((dog) => +dog.height.slice(-2) >= 74)
      .slice(0, 12);
  }

  if (TOP__DOGS.value === 'smallest') {
    filteredData = await fetchedData
      .filter((dog) => +dog.height.slice(-2) < 29)
      .slice(0, 12);
  }

  if (TOP__DOGS.value === 'longest-living') {
    filteredData = await fetchedData
      .filter(
        (dog) => dog.life_span.split(' years').join(' ').trim().slice(-2) > 15
      )
      .slice(0, 12);
  }

  model.state.dogs = filteredData;

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
