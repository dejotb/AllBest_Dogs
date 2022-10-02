import * as model from './model.js';
import { DOGS_FORM, INPUT_BOX,DOGS_CONTAINER, MODAL_LIST, TOP__DOGS, BTN_SEARCH, MODAL, BASKET_ITEMS, BTN_HAMBURGER, BODY, BASKET, SELECT_BUTTON } from './config.js';
import {
  controlSearchInput,
  createSearchList, controlModalClose, controlPagination
} from './controller.js';
import { createSearchList, handleUserSearchData } from './views/searchView.js';
import { handleBasketButton,  handleBasketButtonCLose, handleBasketItem} from './views/basketView.js';
import { showSelectedSortOption, showTopDogs} from './views/selectView.js';
import {  showFilterModal} from './views/filterView.js';
import { addHandlerClick} from './views/paginationView.js';
import { handleHeart} from './views/heartView.js';
import { isElementFocused, scrollToView } from './helpers.js';

require('dotenv').config();

// ==========================================================================
// APP
// ==========================================================================


// check input data in search panel
DOGS_FORM.addEventListener('submit', controlSearchInput);



INPUT_BOX.addEventListener('keyup', handleUserSearchData);

BODY.addEventListener('click', (e) => {
    isElementFocused.bind(INPUT_BOX)
    handleBasketButtonCLose(e)
});
BASKET.addEventListener('click', handleBasketButtonCLose);

BTN_SEARCH.addEventListener('click', scrollToView.bind(DOGS_CONTAINER));

MODAL.addEventListener('click', controlModalClose);
document.addEventListener('keyup', controlModalClose);

BASKET_ITEMS.addEventListener('click', handleBasketItem);



window.addEventListener('beforeunload', () =>
  localStorage.setItem('likedDogs', JSON.stringify(model.state.likedDogs))
);



BTN_HAMBURGER.addEventListener('click', handleBasketButton);





SELECT_BUTTON.addEventListener('click', showFilterModal)

TOP__DOGS.addEventListener('change', showSelectedSortOption)


addHandlerClick(controlPagination)



MODAL_LIST.addEventListener('click', (e) => {
  handleHeart(e);
});

createSearchList();
showTopDogs();