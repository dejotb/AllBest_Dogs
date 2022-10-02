import * as model from './model.js';
import {
  fetchDog,
  createSearchList, handleBasketItem, handleBasketVisibility, controlPagination
} from './controller.js';
import { DOGS_FORM, INPUT_BOX,DOGS_CONTAINER, TOP__DOGS, BTN_SEARCH, MODAL, BASKET_ITEMS, BTN_HAMBURGER, BODY, BASKET, SELECT_BUTTON } from './config.js';
import { isElementFocused, scrollToView } from './helpers.js';
import { createSearchList, handleUserSearchData } from './views/searchView.js';
import { closeModal } from './views/view.js';
import { handleBasketButton,  handleBasketButtonCLose} from './views/basketView.js';
import { showSelectedTopDogs, showPopularDogs} from './views/selectView.js';
import {  showFilterModal} from './views/filterView.js';
import { addHandlerClick} from './views/paginationView.js';

require('dotenv').config();

// ==========================================================================
// APP
// ==========================================================================


// search dog breed based on search input
DOGS_FORM.addEventListener('submit', fetchDog);



INPUT_BOX.addEventListener('keyup', handleUserSearchData);

BODY.addEventListener('click', (e) => {
    isElementFocused.bind(INPUT_BOX)
    handleBasketButtonCLose(e)
});

BTN_SEARCH.addEventListener('click', scrollToView.bind(DOGS_CONTAINER));

MODAL.addEventListener('click', closeModal);
document.addEventListener('keyup', closeModal);

BASKET_ITEMS.addEventListener('click', handleBasketItem);



window.addEventListener('beforeunload', () =>
  localStorage.setItem('likedDogs', JSON.stringify(model.state.likedDogs))
);



BTN_HAMBURGER.addEventListener('click', handleBasketButton);

BASKET.addEventListener('click', handleBasketButtonCLose);




SELECT_BUTTON.addEventListener('click', showFilterModal)

TOP__DOGS.addEventListener('change', showSelectedTopDogs)


addHandlerClick(controlPagination)



createSearchList();
showPopularDogs();