import * as model from './model.js';
// import { addImgUrl } from './model.js';
import { createMarkup } from './views.js';
import {
  DOG_LIST,
  DOGS_FORM,
  AUTOCOMPLETE_INPUT,
  INPUT_BOX,
  ALERTS,
} from './config.js';
import { tempDisableEvents, isElementFocused } from './helpers.js';

export async function generateMarkup(dogs) {
  dogs.map((dog) => createMarkup(dog));
  if (!dogs.length)
    DOG_LIST.textContent = `We coudn't find such a dog's breed. Please try to find some other :)`;

  model.centerDogsListGrid();
}
export async function getImgUrl(dogs) {
  await dogs.map((dog) => model.fetchImgUrl(dog));
}

async function showDog(breed) {
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

// search view

export async function createSearchList() {
  await model.fetchAllBreeds();
  await model.state.breedSuggestions.forEach((el) => {
    const newListItem = document.createElement('li');
    newListItem.textContent = el;

    model.state.breedList.push(newListItem);
    AUTOCOMPLETE_INPUT.appendChild(newListItem);
  });
}

export function select(e) {
  const selectUserData = e.target.textContent;
  INPUT_BOX.value = selectUserData;
  DOG_LIST.classList.remove('centered--one');
  DOG_LIST.classList.remove('centered--two');
  const dogsInput = document.querySelector('#dogs__input');

  DOG_LIST.textContent = '';
  AUTOCOMPLETE_INPUT.classList.remove('active');
  showDog(dogsInput.value);

  dogsInput.value = '';
}

function checkKeyPressed(e) {
  if (e.keyCode !== 13) return;
  select(e);
  const listItems = Array.from(AUTOCOMPLETE_INPUT.querySelectorAll('li'));
  listItems.forEach((item) => (item.tabIndex = -1));
}

export function showBreedSuggestions(list) {
  let listData;
  if (!list.length) {
    const userValue = INPUT_BOX.value;
    listData = `<li>${userValue}</li>`;
    // console.log(listData);
  } else {
    // list.tabIndex = 0;
    listData = list.join('');
  }
  AUTOCOMPLETE_INPUT.innerHTML = listData;
}

export function handleUserData(e) {
  const userData = e.target.value;
  let emptyArray = [];
  if (userData) {
    emptyArray = model.state.breedSuggestions.filter((data) =>
      // filtering array value and user input to lowercase and return only results that start with inputed char
      data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase())
    );
    emptyArray = emptyArray.map(
      (data) => (data = `<li tabindex='0'>${data}</li>`)
    );
    AUTOCOMPLETE_INPUT.classList.add('active');
    showBreedSuggestions(emptyArray);
    const allList = AUTOCOMPLETE_INPUT.querySelectorAll('li');

    allList.forEach((el) => el.addEventListener('click', select));
    allList.forEach((el) => el.addEventListener('keyup', checkKeyPressed));
  } else {
    AUTOCOMPLETE_INPUT.classList.remove('active');
  }
}
