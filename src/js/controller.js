import * as model from './model.js';
import { generateMarkup, getImgUrl, generateDogCard } from './views/view.js';
import {
  DOGS_LIST,
  AUTOCOMPLETE_INPUT,
  BTN_HAMBURGER,
  BASKET_WRAPPER,
} from './config.js';
import { tempDisableEvents } from './helpers.js';
// import { showAlertText } from './views/alertView.js';
import alert from './views/alertView.js';

export async function showDog(breed) {
  await model.fetchDogsData(breed);
  await generateMarkup(model.state.dogs);

  await getImgUrl(model.state.dogs);
}

export function fetchDog(e) {
  e.preventDefault();
  DOGS_LIST.classList.remove('centered--one');
  DOGS_LIST.classList.remove('centered--two');
  const dogsInput = document.querySelector('#dogs__input');

  if (dogsInput.value.length < 3) {
    const markup = `search string has to be longer than 3️⃣ characters.`;
    alert(markup);
    return;
  }
  DOGS_LIST.textContent = '';

  AUTOCOMPLETE_INPUT.classList.remove('active');
  showDog(dogsInput.value);
  tempDisableEvents(e);

  dogsInput.value = '';
}

export function handleBasketItem(e) {
  const selectedDog = e.target.closest('.basket__item').dataset.id;
  console.log(selectedDog);

  const likedDog = model.state.likedDogs.find((dog) => dog.id === +selectedDog);

  console.log(likedDog);
  generateDogCard(likedDog);
}

export function handleBasketVisibility(e) {
  if (
    e.target !== BTN_HAMBURGER &&
    BTN_HAMBURGER.getAttribute('aria-expanded')
  ) {
    BTN_HAMBURGER.setAttribute('aria-expanded', 'false');
    BASKET_WRAPPER.classList.remove('visible');
    BTN_HAMBURGER.classList.remove('transparent');
  }
}
