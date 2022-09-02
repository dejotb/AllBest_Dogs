import { flattenDiagnosticMessageText } from 'typescript';
import * as model from './model.js';
import { fetchDog } from './controller.js';
import { DOGS_FORM } from './config.js';

require('dotenv').config();

DOGS_FORM.addEventListener('submit', fetchDog);
