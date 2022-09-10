import {
  fetchDog,
  createSearchList,
} from './controller.js';
import { DOGS_FORM, INPUT_BOX, MAIN, BTN_SEARCH, MODAL } from './config.js';
import { isElementFocused, scrollToView } from './helpers.js';
import { createSearchList, handleUserSearchData } from './views/searchView.js';
import { closeModal } from './views/modalView.js';

require('dotenv').config();

createSearchList();


DOGS_FORM.addEventListener('submit', fetchDog);

INPUT_BOX.addEventListener('keyup', handleUserSearchData);

document
  .querySelector('body')
  .addEventListener('click', isElementFocused.bind(INPUT_BOX));

BTN_SEARCH.addEventListener('click', scrollToView.bind(MAIN));



MODAL.addEventListener('click', closeModal);
document.addEventListener('keyup', closeModal);