import { flattenDiagnosticMessageText } from 'typescript';
import * as model from './model.js';
import {
  fetchDog,
  createSearchList,
  handleUserData,
  showDogFact,
} from './controller.js';
import { DOGS_FORM, INPUT_BOX, MAIN, BTN_SEARCH, BTN_FACTS } from './config.js';
import { isElementFocused, scrollToView } from './helpers.js';
import { fetchDataCategories } from './temporary.js';

require('dotenv').config();

createSearchList();
// showDogFact();

DOGS_FORM.addEventListener('submit', fetchDog);

INPUT_BOX.addEventListener('keyup', handleUserData);

document
  .querySelector('body')
  .addEventListener('click', isElementFocused.bind(INPUT_BOX));

BTN_SEARCH.addEventListener('click', scrollToView.bind(MAIN));

// fetchDataCategories();

// BTN_FACTS.addEventListener('click', (e) => {
//   e.preventDefault();
//   showDogFact();
// });
