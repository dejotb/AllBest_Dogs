import * as model from '../model.js';
import { DOGS_LIST, AUTOCOMPLETE_INPUT, INPUT_BOX } from '../config.js';
import { showDogItem } from '../controller.js';
import alert from './alertView.js';
import { scrollToView, tempDisableEvents } from '../helpers.js';

// ==========================================================================
// SEARCH VIEW
// ==========================================================================

// get all breed names and add to search list
export async function createSearchList() {
  await model.fetchAllBreeds();
  await model.state.breedSuggestions.forEach((el) => {
    const newListItem = document.createElement('li');
    newListItem.textContent = el;
  });
}

function selectBreed(e) {
  const selectUserData = e.target.textContent;
  INPUT_BOX.value = selectUserData;
  const dogsInput = document.querySelector('#dogs__input');

  DOGS_LIST.textContent = '';
  AUTOCOMPLETE_INPUT.classList.remove('active');
  showDogItem(dogsInput.value);

  dogsInput.value = '';
  scrollToView();
}

function checkSearchKeyPressed(e) {
  if (e.keyCode !== 13) return;
  selectBreed(e);
  const listItems = Array.from(AUTOCOMPLETE_INPUT.querySelectorAll('li'));
  listItems.forEach((item) => (item.tabIndex = -1));
}

// show breed suggestions on letter input
function showBreedSuggestions(list) {
  let listData;
  if (!list.length) {
    const userValue = INPUT_BOX.value;
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join('');
  }
  AUTOCOMPLETE_INPUT.innerHTML = listData;
}

// handle search data
export function handleUserSearchData(e) {
  const userData = e.target.value;
  let emptyArray = [];
  if (userData) {
    emptyArray = model.state.breedSuggestions.filter((data) =>
      data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase())
    );
    emptyArray = emptyArray.map(
      (data) => (data = `<li tabindex='0'>${data}</li>`)
    );
    AUTOCOMPLETE_INPUT.classList.add('active');
    showBreedSuggestions(emptyArray);
    const allList = AUTOCOMPLETE_INPUT.querySelectorAll('li');

    allList.forEach((el) => el.addEventListener('click', selectBreed));

    allList.forEach((el) =>
      el.addEventListener('keyup', checkSearchKeyPressed)
    );
  } else {
    AUTOCOMPLETE_INPUT.classList.remove('active');
  }
}

// control search input
export function controlSearchInput(e) {
  e.preventDefault();
  const dogsInput = document.querySelector('#dogs__input');

  if (dogsInput.value.length < 3) {
    const markup = `String has to have atleast 3️⃣ characters.`;
    alert(markup);
    return;
  }
  DOGS_LIST.textContent = '';
  AUTOCOMPLETE_INPUT.classList.remove('active');
  showDogItem(dogsInput.value);
  tempDisableEvents(e);
  dogsInput.value = '';
}
