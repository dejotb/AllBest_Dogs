import * as model from '../model.js';
import { BASKET_ITEMS } from '../config.js';
import { getLocalStorage } from '../helpers.js';

const basket = document.querySelector('.basket');
const hamburger = document.querySelector('.btn--hamburger');
const basketWrapper = document.querySelector('.basket__list--wrapper');
const basketItems = document.querySelector('.basket__items');

export function createBasketMarkup(dog) {
  const markup = `
  <li class="basket__item" data-id="${dog.id}" tabindex="0">
  <div class="basket__image">
      <span class="loader hidden"></span>
      <img src='${dog.imgUrl}' alt='${dog.name}' loading="lazy">
  </div>
<h3>${dog.name}</h3>
</li>
  `;
  document
    .querySelector('.basket__items')
    .insertAdjacentHTML('afterbegin', markup);
}

export function updateBasket() {
  document.querySelector('.basket__items').textContent = '';
  const { likedDogs } = model.state;
  console.log(likedDogs);
  likedDogs.forEach((el) => createBasketMarkup(el));
}

// ==========================================================================
// Handle Hamburger
// ==========================================================================

const handleHamburger = (e) => {
  const hamburgerState = e.currentTarget.getAttribute('aria-expanded');
  if (hamburgerState === 'false') {
    updateBasket();

    basketWrapper.classList.add('visible');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.classList.add('transparent');
  }
};

hamburger.addEventListener('click', handleHamburger);

const handleBasket = (e) => {
  if (e.target.closest('.hamburger')) {
    return;
  }

  if (e.target.closest('.btn--close')) {
    hamburger.setAttribute('aria-expanded', 'false');
    basketWrapper.classList.remove('visible');
    hamburger.classList.remove('transparent');
  }
};

basket.addEventListener('click', handleBasket);
