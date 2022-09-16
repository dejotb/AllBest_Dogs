import IMAGE from 'url:../../imgs/dog-unknown.svg';
import VanillaTilt from 'vanilla-tilt';
import { updateBasket } from './basketView.js';
import * as model from '../model.js';
import { editText, setLocalStorage, getLocalStorage } from '../helpers.js';
import {
  BREED_WIKI_URL,
  DOGS_LIST,
  MODAL,
  MODAL_LIST,
  API_URL_IMAGES,
} from '../config.js';

const dogList = document.querySelector('.dogs__list');
const modalCard = document.querySelector('.modal__card');

export async function createGridMarkup(dog) {
  const markup = `
      <li class="dog__item" data-id="${dog.id}" tabindex="0">
        <div class="dog__image">
            <span class="loader hidden"></span>
            <img src='' alt='' loading="lazy">
            <span class='dog__heart' data-liked=false>${
              model.state.likedDogs.find((el) => el.id === dog.id) ? '❤️' : '🤍'
            }</span>
        </div>
      <h3>${dog.name}</h3>
      </li>`;
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

export function generateDogCard(dog) {
  const markup = `
    <li class='modal__card' data-id="${dog.id}" data-tilt  >
      <h3>${dog.name}</h3>
      <div class="dog__image">
        <span class="loader hidden"></span>
        <img src='${dog.imgUrl}' alt='${dog.name}' loading="lazy">
        <span class='dog__heart' data-liked=false>${
          model.state.likedDogs.find((el) => el.id === dog.id) ? '❤️' : '🤍'
        }</span>
      </div>
      <ul class='modal__text'>
        <li><span class="text--secondary">breed group:</span> ${
          dog.breed_group ? dog.breed_group.toLowerCase() : undefined
        }</li>
        <li><span class="text--secondary">bred for:</span> ${
          dog.bred_for ? dog.bred_for.toLowerCase() : undefined
        }</li>
        <li ><span class="text--secondary">temperament:</span> ${
          dog.temperament ? dog.temperament.toLowerCase() : undefined
        }</li>
        <ul class='modal__chars'>
        <li ><span class="text--secondary">life span (yrs)</span> ${dog.life_span.slice(
          0,
          7
        )}</li>
        <li ><span class="text--secondary">height (cm)</span> ${dog.height}</li>
        <li ><span class="text--secondary">weight (kg)</span> ${dog.weight}</li>
        </ul>
      </ul>

    </li>

  `;

  // <a href="${BREED_WIKI_URL}/${editText(
  //   dog.name
  // )}" target="_blank">more info..</a>

  MODAL_LIST.insertAdjacentHTML('afterbegin', markup);
  MODAL.classList.remove('hidden');
  document.body.classList.add('sticky__body');
  Array.from(DOGS_LIST.children).forEach((element) => {
    element.tabIndex = -1;
  });

  VanillaTilt.init(document.querySelector('.modal__card'), {
    max: 8,
    speed: 300,
  });
}

function checkIfHeartClicked(e) {
  if (e.target.classList.contains('dog__heart')) return;

  const activeDogId = e.target.closest('.dog__item').dataset.id;
  const dog = model.state.dogs.find((el) => el.id === +activeDogId);
  // console.log(dog);
  generateDogCard(dog);
}

DOGS_LIST.addEventListener('click', checkIfHeartClicked);
DOGS_LIST.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    checkIfHeartClicked(e);
  }
});

export function centerDogsListGrid() {
  if (model.state.dogs.length >= 3) return;
  if (model.state.dogs.length === 1) {
    DOGS_LIST.classList.add('centered--one');
  }
  if (model.state.dogs.length === 2) {
    DOGS_LIST.classList.add('centered--two');
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
    DOGS_LIST.textContent = `We coudn't find such a dog's breed. Please try to find some other :)`;

  centerDogsListGrid();
}

export async function getImgUrl(dogs) {
  await dogs.map((dog) => fetchImgUrl(dog));
}

export function handleHeart(e) {
  if (!e.target.classList.contains('dog__heart')) return;
  const heart = e.target;

  const [likedDog] = model.state.dogs.filter(
    (dog) => dog.id === +heart.closest('li').dataset.id
  );

  // check if selected liked dog is visible in DOG__LIST, or if DOG__LIST is empty
  if (!likedDog || !DOGS_LIST.querySelector('.dog__item')) {
    const filteredLikedDogs = model.state.likedDogs.filter(
      (el) => el.id !== +e.target.closest('.modal__card').dataset.id
    );
    model.state.likedDogs = filteredLikedDogs;
    heart.remove();
    updateBasket(e.target.closest('.modal__card'));
    return;
  }

  // ?

  if (model.state.likedDogs.find((el) => el.id === likedDog.id)) {
    const filteredLikedDogs = model.state.likedDogs.filter(
      (el) => el.id !== likedDog.id
    );
    model.state.likedDogs = filteredLikedDogs;
    heart.textContent = '🤍';
  } else {
    model.state.likedDogs.push(likedDog);

    document.querySelector('.btn--hamburger').classList.add('heart-beat');
    setTimeout(() => {
      document.querySelector('.btn--hamburger').classList.remove('heart-beat');
    }, 1000);
    heart.textContent = '❤️';
  }

  const editedHeart = Array.from(DOGS_LIST.children).find(
    (el) => +el.dataset.id === likedDog.id
  );

  editedHeart.querySelector('.dog__heart').textContent = heart.textContent;

  updateBasket(likedDog);
}

dogList.addEventListener('click', handleHeart);
