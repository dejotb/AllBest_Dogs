import * as model from '../model.js';
import { DOGS_LIST } from '../config.js';

import { showDog } from '../controller.js';
import {
  generateMarkup,
  getImgUrl,
  createGridMarkup,
  fetchImgUrl,
} from './view.js';

export async function showPopularDogs() {
  DOGS_LIST.textContent = '';
  model.state.temporary = [];
  //   DOGS_LIST.classList.add('hidden');

  model.state.popular.forEach(async (dog) => {
    const data = await model.fetchTopDogsData(dog);

    const moreData = await data.map((el) => ({
      name: el.name,
      bred_for: el.bred_for,
      breed_group: el.breed_group,
      life_span: el.life_span,
      imgId: !el.reference_image_id ? '' : el.reference_image_id,
      temperament: el.temperament,
      height: el.height.metric,
      weight: el.weight.metric,
      id: el.id,
      origin: el.origin,
      // imgUrl: dog.image.url,
    }));

    model.state.dogs.push(...moreData);
    console.log(model.state.dogs);
    await createGridMarkup(...moreData);

    await fetchImgUrl(...moreData);
    // await DOGS_LIST.classList.remove('hidden');
  });
  DOGS_LIST.classList.remove('centered--one');
}

export async function showSelectedTopDogs(e) {
  const { value } = e.target;
  model.state.dogs = [];
  if (value === 'popularity') {
    await showPopularDogs();
    // await createGridMarkup(model.state.dogs);
  }
}
