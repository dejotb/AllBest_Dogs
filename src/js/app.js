import * as model from './model.js';
import { generateMarkup, getImgUrl } from './controller.js';

require('dotenv').config();

async function showDog(breed) {
  await model.loadData(breed);
  await generateMarkup(model.state.dogs);

  await getImgUrl(model.state.dogs);
}

showDog('samo');
