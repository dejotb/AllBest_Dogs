import * as model from './model.js';
import {
  fetchDog,
  createSearchList, handleBasketItem, handleBasketVisibility, controlPagination
} from './controller.js';
import { DOGS_FORM, INPUT_BOX,DOGS_CONTAINER, TOP__DOGS, BTN_SEARCH, MODAL, BASKET_ITEMS, BTN_HAMBURGER, BODY, BASKET, SELECT_BUTTON } from './config.js';
import { isElementFocused, scrollToView } from './helpers.js';
import { createSearchList, handleUserSearchData } from './views/searchView.js';
import { closeModal } from './views/modalView.js';
import { handleHamburger,  handleBasket} from './views/basketView.js';
import { showSelectedTopDogs, showPopularDogs} from './views/selectView.js';
import {  showFilterModal} from './views/filterView.js';
import { addHandlerClick} from './views/paginationView.js';

require('dotenv').config();

createSearchList();
showPopularDogs();

DOGS_FORM.addEventListener('submit', fetchDog);

INPUT_BOX.addEventListener('keyup', handleUserSearchData);

BODY.addEventListener('click', (e) => {
    isElementFocused.bind(INPUT_BOX)
    handleBasketVisibility(e)
});

BTN_SEARCH.addEventListener('click', scrollToView.bind(DOGS_CONTAINER));

MODAL.addEventListener('click', closeModal);
document.addEventListener('keyup', closeModal);

BASKET_ITEMS.addEventListener('click', handleBasketItem);



window.addEventListener('beforeunload', () =>
  localStorage.setItem('likedDogs', JSON.stringify(model.state.likedDogs))
);



BTN_HAMBURGER.addEventListener('click', handleHamburger);

BASKET.addEventListener('click', handleBasket);




SELECT_BUTTON.addEventListener('click', showFilterModal)

TOP__DOGS.addEventListener('change', showSelectedTopDogs)


addHandlerClick(controlPagination)