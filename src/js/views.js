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
      <h3>${dog.name}</h3>
      `;
  dogList.insertAdjacentHTML('afterbegin', markup);
}

// ? text blueprint
// <p>The ${dog.name} is a ${dog.breed_group} dog, bred for ${dog.bred_for}</p>

// ? add to individual card
// <a href="${BREED_WIKI_URL}/${editText(dog.name)}" target="_blank">link</a>
// ?

//

// const markup = `
//       <li class="dog__item" data-id="${dog.id}" tabindex="0">
//       <div class="dog__image">
//           <span class="loader hidden"></span>
//           <img src='' alt='${dog.name}'>
//       </div>
//       <p>Name: ${dog.name}</p>
//       <p>life span: ${dog.life_span}</p>
//       <p>${dog.temperament}</p>
//       <a href="${BREED_WIKI_URL}/${editText(dog.name)}" target="_blank">link</a>
//       </li>

//       `;

export async function addImageUrlToMarkup(dogListItems, dogId, dogImgUrl) {
  const addImage = dogListItems.find(
    (listItem) => +listItem.getAttribute('data-id') === dogId
  );

  addImage.querySelector('img').src = dogImgUrl;
}

export function generateDogCard(e) {
  const activeDogId = e.target.closest('.dog__item').dataset.id;
  const dog = model.state.dogs.find((el) => el.id === +activeDogId);
  const markup = `
    <div class='modal__card'>
      <div class="dog__image">
        <span class="loader hidden"></span>
        <img src='${dog.imgUrl}' alt='${dog.name}'>
      </div>
      <h3>${dog.name}</h3>
      <p>${dog.name} is a ${dog.breed_group.toLowerCase()} dog, bred for: ${
    dog.bred_for ? dog.bred_for.toLowerCase() : undefined
  }</p>
      <p>breed group: ${dog.breed_group.toLowerCase()}</p>
      <p>temperament: ${dog.temperament.toLowerCase()}</p>
      <p>life span: ${dog.life_span}</p>
      <p>height: ${dog.height}cm</p>
      <p>weight: ${dog.weight}kg </p>

      <a href="${BREED_WIKI_URL}/${editText(dog.name)}" target="_blank">link</a>
    </div>
  `;
  MODAL.insertAdjacentHTML('afterbegin', markup);
  MODAL.classList.remove('hidden');
  document.body.classList.add('sticky__body');
  Array.from(DOG_LIST.children).forEach((element) => {
    element.tabIndex = -1;
  });
}

DOG_LIST.addEventListener('click', generateDogCard);
DOG_LIST.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    generateDogCard(e);
  }
});

export function closeModal(e) {
  if (e.target.querySelector('.modal__card') || e.keyCode === 27) {
    MODAL.textContent = '';
    MODAL.classList.add('hidden');
    document.body.classList.remove('sticky__body');
    Array.from(DOG_LIST.children).forEach((element) => {
      element.tabIndex = 0;
    });
  }
}

MODAL.addEventListener('click', closeModal);
document.addEventListener('keyup', closeModal);
