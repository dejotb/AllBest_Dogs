import { flattenDiagnosticMessageText } from 'typescript';
import * as model from './model.js';
import { fetchDog, createSearchList, handleUserData } from './controller.js';
import { DOGS_FORM, INPUT_BOX } from './config.js';
import { isElementFocused } from './helpers.js';
import { fetchDataCategories } from './temporary.js';

require('dotenv').config();

createSearchList();

DOGS_FORM.addEventListener('submit', fetchDog);

INPUT_BOX.addEventListener('keyup', handleUserData);

document
  .querySelector('body')
  .addEventListener('click', isElementFocused.bind(INPUT_BOX));

// fetchDataCategories();
