import * as model from '../model.js';

import { DOGS_LIST, AUTOCOMPLETE_INPUT, INPUT_BOX } from '../config.js';
import { scrollToView } from '../helpers.js';

import { showDog } from '../controller.js';

// ==========================================================================
// SEARCH VIEW
// ==========================================================================

export async function createSearchList() {
  await model.fetchAllBreeds();
  await model.state.breedSuggestions.forEach((el) => {
    const newListItem = document.createElement('li');
    newListItem.textContent = el;

    // model.state.breedList.push(newListItem);
    // AUTOCOMPLETE_INPUT.appendChild(newListItem);
  });
}

export function select(e) {
  const selectUserData = e.target.textContent;
  INPUT_BOX.value = selectUserData;
  DOGS_LIST.classList.remove('centered--one');
  DOGS_LIST.classList.remove('centered--two');
  const dogsInput = document.querySelector('#dogs__input');

  DOGS_LIST.textContent = '';
  AUTOCOMPLETE_INPUT.classList.remove('active');
  showDog(dogsInput.value);

  dogsInput.value = '';
  scrollToView();
}

function checkSearchKeyPressed(e) {
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
  } else {
    listData = list.join('');
  }
  AUTOCOMPLETE_INPUT.innerHTML = listData;
}

export function handleUserSearchData(e) {
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

    allList.forEach((el) =>
      el.addEventListener('keyup', checkSearchKeyPressed)
    );
  } else {
    AUTOCOMPLETE_INPUT.classList.remove('active');
  }
}
