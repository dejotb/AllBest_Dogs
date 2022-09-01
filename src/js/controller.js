import * as model from './model.js';
// import { addImgUrl } from './model.js';
import { createMarkup } from './views.js';
import { DOG_LIST } from './config.js';
import { tempDisableEvents } from './helpers.js';

export async function generateMarkup(dogs) {
  dogs.map((dog) => createMarkup(dog));

  model.centerDogsListGrid();
}
export async function getImgUrl(dogs) {
  await dogs.map((dog) => model.fetchImgUrl(dog));
}

async function showDog(breed) {
  await model.fetchData(breed);
  await generateMarkup(model.state.dogs);

  await getImgUrl(model.state.dogs);
}

export function fetchDog(e) {
  e.preventDefault();
  console.log(e);
  DOG_LIST.classList.remove('centered--one');
  DOG_LIST.classList.remove('centered--two');
  const dogsInput = document.querySelector('#dogs__input');

  if (dogsInput.length < 3) {
    DOG_LIST.textContent = 'search string has to be longer that 3 characters';
    return;
  }
  DOG_LIST.textContent = '';

  showDog(dogsInput.value);
  tempDisableEvents(e);

  dogsInput.value = '';
}
