import * as model from '../model.js';
import { BASKET_WRAPPER, BASKET_ITEMS, BTN_HAMBURGER } from '../config.js';
import { generateDogCard } from './modalView.js';

// ==========================================================================
// BASKET VIEW - FAVOURITE DOGS
// ==========================================================================

function createBasketMarkup(dog) {
  const markup = `
  <li class="basket__item" data-id="${dog.id}">
    <div class="basket__image">
        <span class="loader hidden"></span>
        <img src='${dog.imgUrl}' alt='${dog.name}' loading="lazy">
    </div>
    <span class='basket__name'>${dog.name}</span>
</li>
  `;
  BASKET_ITEMS.insertAdjacentHTML('afterbegin', markup);
}

// handle basket input
export function updateBasket() {
  BASKET_ITEMS.textContent = '';
  const { likedDogs } = model.state;
  if (likedDogs.length === 0) {
    const info = document.createElement('li');
    info.textContent = `Basket is empty. Find your best dogs and add them here 🐶`;
    BASKET_ITEMS.appendChild(info);
  } else {
    BASKET_ITEMS.textContent = '';
    likedDogs.forEach((el) => createBasketMarkup(el));
  }
}

// handle basket visibility - open
export const handleBasketButton = (e) => {
  const hamburgerState = e.currentTarget.getAttribute('aria-expanded');
  if (hamburgerState === 'false') {
    updateBasket();

    BASKET_WRAPPER.classList.add('visible');
    BTN_HAMBURGER.setAttribute('aria-expanded', 'true');
    BTN_HAMBURGER.classList.add('transparent');
  }
};

// handle basket visibility - close
export const handleBasketButtonCLose = (e) => {
  if (e.target.closest('.hamburger')) {
    return;
  }

  if (
    e.target.closest('.btn--close') ||
    (e.target !== BTN_HAMBURGER && BTN_HAMBURGER.getAttribute('aria-expanded'))
  ) {
    BTN_HAMBURGER.setAttribute('aria-expanded', 'false');
    BASKET_WRAPPER.classList.remove('visible');
    BTN_HAMBURGER.classList.remove('transparent');
  }
};

export function handleBasketItem(e) {
  const selectedDog = e.target.closest('.basket__item').dataset.id;
  const likedDog = model.state.likedDogs.find((dog) => dog.id === +selectedDog);
  generateDogCard(likedDog);
}
