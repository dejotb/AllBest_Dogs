import * as model from '../model.js';
import { DOGS_LIST } from '../config.js';

import { showDog } from '../controller.js';
import {
  generateMarkup,
  getImgUrl,
  createGridMarkup,
  fetchImgUrl,
} from './view.js';

export function showPopularDogs() {
  DOGS_LIST.textContent = '';

  model.state.dogs.push(...model.state.popular);
  generateMarkup(model.state.dogs);
  getImgUrl(model.state.dogs);
  DOGS_LIST.classList.remove('centered--one');
}

async function getAll() {
  DOGS_LIST.textContent = '';
  await model.fetchAllBreedsData();
  const moreData = model.state.dogs;
  const filteredData = moreData.filter((dog) => +dog.height.slice(-2) > 80);

  model.state.dogs = filteredData;

  console.log(model.state.dogs);
  generateMarkup(model.state.dogs);
  getImgUrl(model.state.dogs);
}

export function showSelectedTopDogs(e) {
  const { value } = e.target;
  model.state.dogs = [];
  if (value === 'popularity') {
    showPopularDogs();
  }
  if (value === 'largest') {
    getAll();
  }
}
