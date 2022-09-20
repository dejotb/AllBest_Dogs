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

export function showSelectedTopDogs(e) {
  const { value } = e.target;
  model.state.dogs = [];
  if (value === 'popularity') {
    showPopularDogs();
  }
}
