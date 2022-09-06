import * as model from './model.js';
import { editText } from './helpers.js';
import { BREED_WIKI_URL, DOG_LIST, MODAL } from './config.js';

const dogList = document.querySelector('.dog__list');

export async function createGridMarkup(dog) {
  const markup = `
      <li class="dog__item" data-id="${dog.id}" tabindex="0">
      <div class="dog__image">
          <span class="loader hidden"></span>
          <img src='' alt='${dog.name}'>
      </div>
      <p>Name: ${dog.name}</p>
      <p>life span: ${dog.life_span}</p>
      <p>${dog.temperament}</p>
      <a href="${BREED_WIKI_URL}/${editText(dog.name)}" target="_blank">link</a>
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

export function generateDogCard(e) {
  const activeDogId = e.target.closest('.dog__item').dataset.id;
  console.log(model.state.dogs);
  const dog = model.state.dogs.find((el) => el.id === +activeDogId);
  console.log(dog);
  const markup = `
    <div class='modal__card'>
      <div class="dog__image">
        <span class="loader hidden"></span>
        <img src='${dog.imgUrl}' alt='${dog.name}'>
      </div>
      <p>Name: ${dog.name}</p>
      <p>life span: ${dog.life_span}</p>
      <p>${dog.temperament}</p>
      <a href="${BREED_WIKI_URL}/${editText(dog.name)}" target="_blank">link</a>
    </div>
  `;
  MODAL.insertAdjacentHTML('afterbegin', markup);
  MODAL.classList.remove('hidden');
}

DOG_LIST.addEventListener('click', generateDogCard);

MODAL.addEventListener('click', (e) => {
  if (e.target.querySelector('.modal__card')) {
    MODAL.textContent = '';
    MODAL.classList.add('hidden');
  }
  // console.log('yes');
});
