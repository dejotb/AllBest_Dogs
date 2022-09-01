import IMAGE from 'url:../imgs/dog-unknown.webp';
import { editText } from './helpers.js';

console.log(IMAGE);

const dogList = document.querySelector('.dog__list');

export async function createMarkup(dog) {
  const markup = `
      <li class="dog__item" data-id="${dog.id}">
      <img class="dog__image" src='' alt='${dog.name}'>
      <p>Name: ${dog.name}</p>
      <p>life span: ${dog.life_span}</p>
      <p>${dog.temperament}</p>
      <a href="https://www.petfinder.com/dog-breeds/${editText(
        dog.name
      )}/" target="_blank">link</a>
      </li>

      `;
  dogList.insertAdjacentHTML('afterbegin', markup);
}

// ? text blueprint
// <p>The ${dog.name} is a ${dog.breed_group} dog, bred for ${dog.bred_for}</p>
// ?

export async function addImageUrlToMarkup(
  dogListItems,
  dogId,
  dogImgUrl = IMAGE
) {
  const addImage = dogListItems.find(
    (listItem) => +listItem.getAttribute('data-id') === dogId
  );
  if (dogImgUrl === undefined || !dogImgUrl) {
    addImage.querySelector('img').src = IMAGE;
  } else addImage.querySelector('img').src = dogImgUrl;
}
