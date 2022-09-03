import * as model from './model.js';
// import { addImgUrl } from './model.js';
import { createMarkup } from './views.js';
import { DOG_LIST, DOGS_FORM } from './config.js';
import { tempDisableEvents } from './helpers.js';

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
  // createSearchList();

  if (dogsInput.value.length < 3) {
    DOG_LIST.textContent = 'search string has to be longer that 3 characters';
    return;
  }
  DOG_LIST.textContent = '';
  autoCompleteInput.classList.remove('active');
  showDog(dogsInput.value);
  tempDisableEvents(e);

  dogsInput.value = '';
}

// search view

const inputBox = document.querySelector('input');
const btnSearch = document.querySelector('#search__button');
export const autoCompleteInput = document.querySelector('.autocomplete__input');

inputBox.addEventListener('keyup', handleUserData);

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
    autoCompleteInput.classList.add('active');
    showBreedSuggestions(emptyArray);
    const allList = autoCompleteInput.querySelectorAll('li');

    allList.forEach((el) => el.addEventListener('click', select));
    allList.forEach((el) => el.addEventListener('keyup', checkKeyPressed));
  } else {
    autoCompleteInput.classList.remove('active');
  }
}

function checkKeyPressed(e) {
  if (e.keyCode !== 13) return;
  select(e);
}

export function select(e) {
  // console.log(e.keyCode);
  // if (e.keyCode !== 13) return;
  // console.log(e);
  const selectUserData = e.target.textContent;
  inputBox.value = selectUserData;
  DOG_LIST.classList.remove('centered--one');
  DOG_LIST.classList.remove('centered--two');
  const dogsInput = document.querySelector('#dogs__input');

  DOG_LIST.textContent = '';
  autoCompleteInput.classList.remove('active');
  showDog(dogsInput.value);

  dogsInput.value = '';
}

export function showBreedSuggestions(list) {
  let listData;
  if (!list.length) {
    const userValue = inputBox.value;
    listData = `<li>${userValue}</li>`;
    // console.log(listData);
  } else {
    // list.tabIndex = 0;
    listData = list.join('');
  }
  autoCompleteInput.innerHTML = listData;
}

export async function createSearchList() {
  await model.fetchAllBreeds();
  await model.state.breedSuggestions.forEach((el) => {
    const newListItem = document.createElement('li');
    newListItem.textContent = el;

    model.state.breedList.push(newListItem);
    autoCompleteInput.appendChild(newListItem);
  });
}

const listAllBreeds = document.querySelector('.select__breeds');

// listAllBreeds.addEventListener('click', (e) => {
//   // model.state.breedSuggestions = model.state.breedList;
//   autoCompleteInput.classList.toggle('active');
//   console.log(model.state.breedList);
//   const allList = autoCompleteInput.querySelectorAll('li');
//   // console.log(allList);
//   model.state.breedSuggestions.forEach((el) => {
//     const newListItem = document.createElement('li');
//     newListItem.textContent = el;

//     autoCompleteInput.appendChild(newListItem);
//   });
//   model.state.breedSuggestions.forEach((el) =>
//     el.addEventListener('click', select)
//   );
//   // allList.forEach((el) => el.addEventListener('keyup', checkKeyPressed));
//   // const allList = autoCompleteInput.querySelectorAll('li');
//   // console.log(allList);
//   // allList.forEach((el) => el.addEventListener('click', select));
// });

createSearchList();
