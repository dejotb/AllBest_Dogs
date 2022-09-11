import {
  fetchDog,
  createSearchList,
} from './controller.js';
import { DOGS_FORM, INPUT_BOX, MAIN, BTN_SEARCH, MODAL } from './config.js';
import { isElementFocused, scrollToView } from './helpers.js';
import { createSearchList, handleUserSearchData } from './views/searchView.js';
import { closeModal } from './views/modalView.js';
import { handleNavigation,  handleHamburger} from './views/navigationView.js';

require('dotenv').config();

createSearchList();


DOGS_FORM.addEventListener('submit', fetchDog);

INPUT_BOX.addEventListener('keyup', handleUserSearchData);

document
  .querySelector('body')
  .addEventListener('click', (e) => {
    isElementFocused.bind(INPUT_BOX)

    if (e.target !== document.querySelector('.btn--hamburger') && document.querySelector('.btn--hamburger').getAttribute('aria-expanded'))
{
  document.querySelector('.btn--hamburger').setAttribute('aria-expanded', 'false')
  document.querySelector('.nav__list--wrapper').classList.remove('visible');
  document.querySelector('.btn--hamburger').classList.remove('transparent');
}


    // document.querySelector('.btn--hamburger').setAttribute('aria-expanded', 'false');
    // document.querySelector('.nav__list--wrapper').classList.remove('visible');
    // document.querySelector('.btn--hamburger').classList.remove('transparent');
  });

BTN_SEARCH.addEventListener('click', scrollToView.bind(MAIN));



MODAL.addEventListener('click', closeModal);
document.addEventListener('keyup', closeModal);




document.querySelector('.nav').addEventListener('click', handleNavigation);
document.querySelector('.btn--hamburger').addEventListener('click', handleHamburger);



