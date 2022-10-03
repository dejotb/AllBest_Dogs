import * as model from '../model.js';
import { DOGS_LIST } from '../config.js';
import { handleHeart } from './heartView.js';
import alert from './alertView.js';

const dogList = document.querySelector('.dogs__list');

// ==========================================================================
// VIEW
// ==========================================================================

export async function createGridMarkup(dog) {
  const markup = `
      <li class="dog__item" data-id="${dog.id}" tabindex="0">
        <div class="dog__image">
            <span class="loader hidden"></span>
        </div>
        <div class='dog__caption'>
          <button class='dog__details' title="view details">🔎</button>
          <span class='dog__name'>${dog.name}</span>
          <span class='dog__heart' >${
            model.state.likedDogs.find((el) => el.id === dog.id) ? '💖' : '🤍'
          }</span>
        </div>
        <span class='dog__heart--info alert__text hidden'>Breed added to favourites! 💕</span>
      </li>`;
  dogList.insertAdjacentHTML('beforeend', markup);
}

// control dog list layout based on number of visible items
export function centerDogsListGrid() {
  if (model.state.dogs.length >= 3) {
    DOGS_LIST.classList.remove('centered--two');
    DOGS_LIST.classList.remove('centered--one');
  }
  if (model.state.dogs.length <= 1) {
    DOGS_LIST.classList.add('centered--one');
    DOGS_LIST.classList.remove('centered--two');
  }
  if (model.state.dogs.length === 2) {
    DOGS_LIST.classList.add('centered--two');
    DOGS_LIST.classList.remove('centered--one');
  }
}

export async function generateMarkup(dogs) {
  dogs.map((dog) => createGridMarkup(dog));
  if (!dogs.length) {
    const markup = `We coudn't find such a dog breed. Please try to find some other 🐶`;
    alert(markup);
  }
  centerDogsListGrid();
}

// fetch image to all visible items in dog list
export async function getImgUrl(dogs) {
  await dogs.map((dog) => model.fetchImgUrl(dog));
}

dogList.addEventListener('click', handleHeart);
