import * as model from '../model.js';
import { BASKET_WRAPPER, BASKET_ITEMS, BTN_HAMBURGER } from '../config.js';

// ==========================================================================
// BASKET VIEW
// ==========================================================================

export function createBasketMarkup(dog) {
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

export function updateBasket() {
  BASKET_ITEMS.textContent = '';
  const { likedDogs } = model.state;
  if (likedDogs.length === 0) {
    const info = document.createElement('li');
    info.textContent = `Basket is empty. Find your best dogs and add them here 🐶`;
    BASKET_ITEMS.appendChild(info);
  } else {
    BASKET_ITEMS.textContent = '';
    console.log(likedDogs);
    likedDogs.forEach((el) => createBasketMarkup(el));
  }
}

export const handleHamburger = (e) => {
  const hamburgerState = e.currentTarget.getAttribute('aria-expanded');
  if (hamburgerState === 'false') {
    updateBasket();

    BASKET_WRAPPER.classList.add('visible');
    BTN_HAMBURGER.setAttribute('aria-expanded', 'true');
    BTN_HAMBURGER.classList.add('transparent');
  }
};

export const handleBasket = (e) => {
  if (e.target.closest('.hamburger')) {
    return;
  }

  if (e.target.closest('.btn--close')) {
    BTN_HAMBURGER.setAttribute('aria-expanded', 'false');
    BASKET_WRAPPER.classList.remove('visible');
    BTN_HAMBURGER.classList.remove('transparent');
  }
};
