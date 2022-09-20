import * as model from '../model.js';
import { DOGS_LIST } from '../config.js';

import { showDog } from '../controller.js';
import { generateMarkup, getImgUrl } from './view.js';

async function showPopularDogs() {
  DOGS_LIST.textContent = '';
  model.state.temporary = [];
  //   await generateMarkup(model.state.popular);

  //   model.state.dogs = model.state.popular;
  //   const topDogs = model.state.dogs;

  //   console.log(topDogs);

  //   await getImgUrl(topDogs);

  await model.state.popular.forEach((dog) => model.fetchDogsData(dog));

  await generateMarkup(model.state.dogs);

  await getImgUrl(model.state.dogs);

  //   await getImgUrl(model.state.dogs);

  //   let { dogs } = model.state;

  //   dogs = model.state.temporary;

  //   console.log(dogs);
}

export async function showSelectedTopDogs(e) {
  const { value } = e.target;
  if (value === 'popularity') {
    DOGS_LIST.textContent = '';
    model.state.temporary = [];

    await model.state.popular.forEach((dog) => model.fetchDogsData(dog));
    await generateMarkup(model.state.dogs);

    await getImgUrl(model.state.dogs);

    // showPopularDogs();
  }
}
