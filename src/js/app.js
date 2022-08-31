import * as model from './model.js';
import { generateMarkup, getImgUrl } from './controller.js';
import { DOGS__FORM } from './config.js';

require('dotenv').config();

async function showDog(breed) {
  await model.loadData(breed);
  await generateMarkup(model.state.dogs);

  await getImgUrl(model.state.dogs);
}

// showDog('shep');

function fetchDog(e) {
  const dogList = document.querySelector('.dog__list');
  const dogsInput = document.querySelector('#dogs__input').value;
  console.log(dogsInput.length);

  dogList.textContent = '';
  e.preventDefault();
  showDog(dogsInput);
  console.log(dogsInput);
}

DOGS__FORM.addEventListener('submit', fetchDog);
