import * as model from './model.js';
import {
  fetchDog,
  createSearchList, handleBasketItem, handleBasketVisibility
} from './controller.js';
import { DOGS_FORM, INPUT_BOX, MAIN, BTN_SEARCH, MODAL, BASKET_ITEMS, BTN_HAMBURGER, BODY } from './config.js';
import { isElementFocused, scrollToView, setLocalStorage} from './helpers.js';
import { createSearchList, handleUserSearchData } from './views/searchView.js';
import { closeModal } from './views/modalView.js';
import { handleNavigation,  handleBasket} from './views/basketView.js';

require('dotenv').config();

// getLocalStorage('likedDogs');

createSearchList();

DOGS_FORM.addEventListener('submit', fetchDog);

INPUT_BOX.addEventListener('keyup', handleUserSearchData);

BODY.addEventListener('click', (e) => {
    isElementFocused.bind(INPUT_BOX)
    handleBasketVisibility(e)
});

BTN_SEARCH.addEventListener('click', scrollToView.bind(MAIN));

MODAL.addEventListener('click', closeModal);
document.addEventListener('keyup', closeModal);

BASKET_ITEMS.addEventListener('click', handleBasketItem);


console.log(model.state.likedDogs);

// setLocalStorage('likedDogs', model.state.likedDogs);
window.addEventListener('beforeunload', () => {
  localStorage.setItem('likedDogs', JSON.stringify(model.state.likedDogs))
});
