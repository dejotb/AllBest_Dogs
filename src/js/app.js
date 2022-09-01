import * as model from './model.js';
import { fetchDog } from './controller.js';
import { DOGS__FORM } from './config.js';

require('dotenv').config();

DOGS__FORM.addEventListener('submit', fetchDog);
