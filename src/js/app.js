import { flattenDiagnosticMessageText } from 'typescript';
import * as model from './model.js';
import { fetchDog, createSearchList, handleUserData } from './controller.js';
import { DOGS_FORM, INPUT_BOX } from './config.js';

require('dotenv').config();

DOGS_FORM.addEventListener('submit', fetchDog);

INPUT_BOX.addEventListener('keyup', handleUserData);

createSearchList();
