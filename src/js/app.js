import * as model from './model.js';
import {
  fetchDog,
  createSearchList, handleBasketItem, handleBasketVisibility, generateMarkup
} from './controller.js';
import { DOGS_FORM, INPUT_BOX,DOGS_CONTAINER, TOP__DOGS, MAIN, BTN_SEARCH, MODAL, BASKET_ITEMS, BTN_FACTS, BTN_HAMBURGER, BODY, BASKET } from './config.js';
import { isElementFocused, scrollToView, setLocalStorage} from './helpers.js';
import { createSearchList, handleUserSearchData } from './views/searchView.js';
import { closeModal } from './views/modalView.js';
import { handleHamburger,  handleBasket} from './views/basketView.js';
import { showSelectedTopDogs, showPopularDogs} from './views/selectView.js';
import { generateMarkup, getImgUrl} from './views/view.js';
import { fetchDataCategories} from './temporary.js';

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


// console.log(model.state.likedDogs);

window.addEventListener('beforeunload', () => {
  localStorage.setItem('likedDogs', JSON.stringify(model.state.likedDogs))
});



BTN_HAMBURGER.addEventListener('click', handleHamburger);

BASKET.addEventListener('click', handleBasket);

// export async function showDogFact() {
//   const dogFact = document.querySelector('.fact__text');
//   await model.fetchDogsFacts();
//   dogFact.textContent = `Dog fact: ${model.state.fact}`;
// }

// BTN_FACTS.addEventListener('click', (e) => {
//   e.preventDefault();
//   showDogFact();
// });

// showDogFact();


//////////////////////////////


//???????
// document.querySelector('.button__filters').addEventListener('click', fetchDataCategories)

TOP__DOGS.addEventListener('change', showSelectedTopDogs)

