import { flattenDiagnosticMessageText } from 'typescript';
import * as model from './model.js';
import {
  fetchDog,
  createSearchList,
  handleUserData,
  showDogFact,
} from './controller.js';
import { DOGS_FORM, INPUT_BOX, BTN__FACTS } from './config.js';
import { isElementFocused } from './helpers.js';
import { fetchDataCategories } from './temporary.js';

createSearchList();
showDogFact();

DOGS_FORM.addEventListener('submit', fetchDog);

INPUT_BOX.addEventListener('keyup', handleUserData);

document
  .querySelector('body')
  .addEventListener('click', isElementFocused.bind(INPUT_BOX));

// fetchDataCategories();

BTN__FACTS.addEventListener('click', (e) => {
  e.preventDefault();
  showDogFact();
});
