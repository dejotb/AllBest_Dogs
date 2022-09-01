import { editText } from './helpers.js';
import { BREED_WIKI_URL } from './config.js';

const dogList = document.querySelector('.dog__list');

export async function createMarkup(dog) {
  const markup = `
      <li class="dog__item" data-id="${dog.id}" tabindex="0">

      <img class="dog__image" src='' alt='${dog.name}'>
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
