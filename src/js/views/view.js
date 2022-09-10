import IMAGE from 'url:../../imgs/dog-unknown.svg';
import * as model from '../model.js';
import { editText } from '../helpers.js';
import { BREED_WIKI_URL, DOG_LIST, MODAL, API_URL_IMAGES } from '../config.js';

const dogList = document.querySelector('.dog__list');

export async function createGridMarkup(dog) {
  const markup = `
      <li class="dog__item" data-id="${dog.id}" tabindex="0">
      <div class="dog__image">
          <span class="loader hidden"></span>
          <img src='' alt='' loading="lazy">
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

export async function addImageUrlToMarkup(dogListItems, dogId, dogImgUrl) {
  const addImage = dogListItems.find(
    (listItem) => +listItem.getAttribute('data-id') === dogId
  );

  addImage.querySelector('img').src = dogImgUrl;
}

export function generateDogCard(e) {
  const activeDogId = e.target.closest('.dog__item').dataset.id;
  const dog = model.state.dogs.find((el) => el.id === +activeDogId);
  console.log(e.target);
  const markup = `
    <div class='modal__card'>
      <h3>${dog.name}</h3>
      <div class="dog__image">
        <span class="loader hidden"></span>
        <img src='${dog.imgUrl}' alt='${dog.name}'>
      </div>
      <ul class='modal__text'>
        <li>bred group: ${
          dog.breed_group ? dog.breed_group.toLowerCase() : undefined
        };</li>
        <li> bred for: ${
          dog.bred_for ? dog.bred_for.toLowerCase() : undefined
        };</li>
        <li>temperament: ${
          dog.temperament ? dog.temperament.toLowerCase() : undefined
        };</li>
        <li>life span: ${dog.life_span};</li>
        <li>height: ${dog.height}cm;</li>
        <li>weight: ${dog.weight}kg;</li>
      </ul>
      <a href="${BREED_WIKI_URL}/${editText(
    dog.name
  )}" target="_blank">more info..</a>

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

export function centerDogsListGrid() {
  if (model.state.dogs.length >= 3) return;
  if (model.state.dogs.length === 1) {
    DOG_LIST.classList.add('centered--one');
  }
  if (model.state.dogs.length === 2) {
    DOG_LIST.classList.add('centered--two');
  }
}

export async function fetchImgUrl(dog) {
  const { imgId, id } = dog;

  try {
    const dogListItems = [...document.querySelectorAll('.dog__item')];
    const listItem = dogListItems.find(
      (item) => +item.getAttribute('data-id') === id
    );

    if (imgId.length === 0) {
      dog.imgUrl = IMAGE;
    } else {
      if (!process.env.DOGS_API_KEY) {
        throw new Error('You forgot to set DOGS_API_KEY ');
      }

      listItem.querySelector('.loader').classList.remove('hidden');

      const data = await fetch(`${API_URL_IMAGES}${imgId}`, {
        headers: {
          'X-Api-Key': process.env.DOGS_API_KEY,
        },
      });
      const result = await data.json();
      dog.imgUrl = result.url;
    }
    await addImageUrlToMarkup(dogListItems, dog.id, dog.imgUrl);
    listItem.querySelector('.loader').classList.add('hidden');
  } catch (err) {
    console.log(err);
  }
}

export async function generateMarkup(dogs) {
  dogs.map((dog) => createGridMarkup(dog));
  if (!dogs.length)
    DOG_LIST.textContent = `We coudn't find such a dog's breed. Please try to find some other :)`;

  centerDogsListGrid();
}

export async function getImgUrl(dogs) {
  await dogs.map((dog) => fetchImgUrl(dog));
}
