import * as model from './model.js';
// import { addImgUrl } from './model.js';
import { createMarkup } from './views.js';
import { DOG__LIST } from './config.js';

export async function generateMarkup(dogs) {
  dogs.map((dog) => createMarkup(dog));

  model.centerDogsListGrid();
}
export async function getImgUrl(dogs) {
  await dogs.map((dog) => model.fetchImgUrl(dog, dog.imgId));
}

async function showDog(breed) {
  await model.fetchData(breed);
  await generateMarkup(model.state.dogs);

  await getImgUrl(model.state.dogs);
}

export function fetchDog(e) {
  e.preventDefault();
  DOG__LIST.classList.remove('centered--one');
  DOG__LIST.classList.remove('centered--two');
  const dogsInput = document.querySelector('#dogs__input').value;

  if (dogsInput.length < 3) {
    DOG__LIST.textContent = 'search string has to be longer that 3 characters';
    return;
  }

  DOG__LIST.textContent = '';
  showDog(dogsInput);
}
