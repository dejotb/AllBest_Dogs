import * as model from './model.js';
import { editText } from './helpers.js';
import { BREED_WIKI_URL } from './config.js';

const dogList = document.querySelector('.dog__list');

export async function createMarkup(dog) {
  const markup = `
      <li class="dog__item" data-id="${dog.id}" tabindex="0">
      <div class="dog__image">
          <span class="loader hidden"></span>
          <img src='' alt='${dog.name}'>
      </div>
      <p>Name: ${dog.name}</p>
      <p>life span: ${dog.life_span}</p>
      <p>${dog.temperament}</p>
      </li>

      `;
  dogList.insertAdjacentHTML('afterbegin', markup);
}

// ? text blueprint
// <p>The ${dog.name} is a ${dog.breed_group} dog, bred for ${dog.bred_for}</p>

// ? add to individual card
// <a href="${BREED_WIKI_URL}/${editText(dog.name)}" target="_blank">link</a>
// ?

export async function addImageUrlToMarkup(dogListItems, dogId, dogImgUrl) {
  const addImage = dogListItems.find(
    (listItem) => +listItem.getAttribute('data-id') === dogId
  );

  addImage.querySelector('img').src = dogImgUrl;
}

// search view

const inputBox = document.querySelector('input');
const autoCompleteInput = document.querySelector('.autocomplete__input');

inputBox.addEventListener('keyup', handleUserData);

export function handleUserData(e) {
  const userData = e.target.value;
  let emptyArray = [];
  if (userData) {
    emptyArray = model.state.breedSuggestions.filter((data) =>
      // filtering array value and user input to lowercase and return only results that start with inputed char
      data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase())
    );
    emptyArray = emptyArray.map((data) => (data = `<li>${data}</li>`));
    console.log(emptyArray);
    autoCompleteInput.classList.add('active');
  } else {
    autoCompleteInput.classList.remove('active');
  }
  showBreedSuggestions(emptyArray);
}

export function showBreedSuggestions(list) {
  let listData;
  if (!list.length) {
    const userValue = inputBox.value;
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join('');
    console.log(listData);
  }
  autoCompleteInput.innerHTML = listData;
}

export async function createSearchList() {
  await model.fetchAllBreeds();
  await model.state.breedSuggestions.forEach((el) => {
    const newListItem = document.createElement('li');
    newListItem.textContent = el;
    autoCompleteInput.appendChild(newListItem);
  });
}

createSearchList();
