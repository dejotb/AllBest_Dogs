// import IMAGE from 'https://picsum.photos/200/300';
import { API_URL_BREEDS, API_URL_IMAGES, DOG__LIST } from './config.js';
import { addImageUrlToMarkup } from './views.js';

export const state = {
  dogs: [],
};

export function createDogsObjects(dogs) {
  state.dogs = dogs.map((dog) => ({
    name: dog.name,
    bred_for: dog.bred_for,
    breed_group: dog.breed_group,
    life_span: dog.life_span,
    imgId: !dog.reference_image_id ? '' : dog.reference_image_id,
    temperament: dog.temperament,
    height: dog.height.metric,
    weight: dog.weight.metric,
    id: dog.id,
    origin: dog.origin,
  }));

  // console.log(state.dogs);
}

export async function fetchData(value) {
  try {
    if (!process.env.DOGS_API_KEY) {
      throw new Error('You forgot to set DOGS_API_KEY ');
    }
    if (value === '' || value === undefined)
      console.log(`search for dog's breed`);

    const data = await fetch(`${API_URL_BREEDS}${value}`, {
      headers: {
        'X-Api-Key': process.env.DOGS_API_KEY,
      },
    });
    const result = await data.json();

    createDogsObjects(result);
  } catch (err) {
    console.log(err);
  }
}

export async function fetchImgUrl(dog, imgId) {
  try {
    if (!process.env.DOGS_API_KEY) {
      throw new Error('You forgot to set DOGS_API_KEY ');
    }

    const data = await fetch(`${API_URL_IMAGES}${imgId}`, {
      headers: {
        'X-Api-Key': process.env.DOGS_API_KEY,
      },
    });

    const result = await data.json();

    dog.imgUrl = result.url;

    if (dog.imgUrl === undefined) {
      dog.imgUrl = 'https://picsum.photos/200/300';
    }
    const dogImgUrl = dog.imgUrl;
    const dogId = dog.id;

    const dogListItems = [...document.querySelectorAll('.dog__item')];

    console.log(dog.imgUrl);
    await addImageUrlToMarkup(dogListItems, dogId, dogImgUrl);
  } catch (err) {
    console.log(err);
  }
}

export function centerDogsListGrid() {
  if (state.dogs.length >= 3) return;
  if (state.dogs.length === 1) {
    DOG__LIST.classList.add('centered--one');
  }
  if (state.dogs.length === 2) {
    DOG__LIST.classList.add('centered--two');
  }
}
