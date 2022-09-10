import * as model from './model.js';
import { generateMarkup, getImgUrl } from './views/view.js';
import { DOG_LIST, AUTOCOMPLETE_INPUT } from './config.js';
import { tempDisableEvents } from './helpers.js';

export async function showDog(breed) {
  await model.fetchDogsData(breed);
  await generateMarkup(model.state.dogs);

  await getImgUrl(model.state.dogs);
}

export function fetchDog(e) {
  e.preventDefault();
  DOG_LIST.classList.remove('centered--one');
  DOG_LIST.classList.remove('centered--two');
  const dogsInput = document.querySelector('#dogs__input');

  if (dogsInput.value.length < 3) {
    DOG_LIST.textContent = 'search string has to be longer than 3 characters';
    return;
  }
  DOG_LIST.textContent = '';

  AUTOCOMPLETE_INPUT.classList.remove('active');
  showDog(dogsInput.value);
  tempDisableEvents(e);

  dogsInput.value = '';
}
