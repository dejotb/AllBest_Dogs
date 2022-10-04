import * as model from './model.js';
import {
  DOGS_FORM,
  INPUT_BOX,
  DOGS_CONTAINER,
  MODAL_LIST,
  TOP__DOGS,
  BTN_SEARCH,
  MODAL,
  BASKET_ITEMS,
  BTN_BASKET,
  BODY,
  BASKET,
  SELECT_BUTTON,
} from './config.js';
import { controlModalClose, controlPagination } from './controller.js';
import {
  createSearchList,
  handleUserSearchData,
  controlSearchInput,
} from './views/searchView.js';
import {
  handleBasketButton,
  handleBasketButtonCLose,
  handleBasketItem,
} from './views/basketView.js';
import { showSelectedSortOption, showTopDogs } from './views/selectView.js';
import { showFilterModal } from './views/filterView.js';
import { addHandlerClick } from './views/paginationView.js';
import { handleHeart } from './views/heartView.js';
import { isElementFocused, scrollToView } from './helpers.js';

require('dotenv').config();

// ==========================================================================
// APP
// ==========================================================================

// handle local storage on site leave
window.addEventListener('beforeunload', () =>
  localStorage.setItem('likedDogs', JSON.stringify(model.state.likedDogs))
);

// check input data in search panel
DOGS_FORM.addEventListener('submit', controlSearchInput);

// handle search data
INPUT_BOX.addEventListener('keyup', handleUserSearchData);

// handle modal close
MODAL.addEventListener('click', controlModalClose);
document.addEventListener('keyup', controlModalClose);

// handle basket items
BASKET_ITEMS.addEventListener('click', handleBasketItem);

// handle basket visibility - open
BODY.addEventListener('click', (e) => {
  isElementFocused.bind(INPUT_BOX);
  handleBasketButtonCLose(e);
});

// handle basket visibility - close
BASKET.addEventListener('click', handleBasketButtonCLose);

// scroll into view on dog item list
BTN_SEARCH.addEventListener('click', scrollToView.bind(DOGS_CONTAINER));

// handle basket visibility - open
BTN_BASKET.addEventListener('click', handleBasketButton);

// handle filter modal
SELECT_BUTTON.addEventListener('click', showFilterModal);

// check selected sort option
TOP__DOGS.addEventListener('change', showSelectedSortOption);

// handle pagination
addHandlerClick(controlPagination);

// handle liked breed
MODAL_LIST.addEventListener('click', handleHeart);

// get all breed names and add to search list
createSearchList();
