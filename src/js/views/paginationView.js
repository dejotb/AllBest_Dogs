import * as model from '../model.js';
import { DOGS_LIST, TOP__DOGS, LOADER } from '../config.js';

import { showDog } from '../controller.js';
import {
  generateMarkup,
  getImgUrl,
  createGridMarkup,
  fetchImgUrl,
} from './view.js';
