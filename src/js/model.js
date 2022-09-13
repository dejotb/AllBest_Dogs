import { API_URL_BREED, API_URL_BREEDS, ALERTS } from './config.js';

export const state = {
  dogs: [],
  breedSuggestions: [],
  breedList: [],
  likedDogs: [],
  // fact: '',
};

state.likedDogs = JSON.parse(localStorage.likedDogs);

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
    // imgUrl: dog.image.url,
  }));
}

export async function fetchAllBreeds() {
  try {
    if (!process.env.DOGS_API_KEY) {
      throw new Error('You forgot to set DOGS_API_KEY ');
    }
    const data = await fetch(`${API_URL_BREEDS}`, {
      headers: {
        'X-Api-Key': process.env.DOGS_API_KEY,
      },
    });
    const result = await data.json();

    state.breedSuggestions = result.map((item) => item.name);
  } catch (err) {
    console.log(err);
  }
}

export async function fetchDogsData(value) {
  try {
    if (!process.env.DOGS_API_KEY) {
      throw new Error('You forgot to set DOGS_API_KEY ');
    }
    if (value === '' || value === undefined)
      console.log(`search for dog's breed`);

    ALERTS.querySelector('.loader').classList.remove('hidden');

    const data = await fetch(`${API_URL_BREED}${value}`, {
      headers: {
        'X-Api-Key': process.env.DOGS_API_KEY,
      },
    });
    const result = await data.json();

    ALERTS.querySelector('.loader').classList.add('hidden');
    createDogsObjects(result);
  } catch (err) {
    console.log(err);
  }
}

export async function fetchDogsFacts() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.FACTS_API_KEY,
      'X-RapidAPI-Host': 'dog-facts2.p.rapidapi.com',
    },
  };
  try {
    const data = await fetch(
      'https://dog-facts2.p.rapidapi.com/facts',
      options
    );

    const result = await data.json();
    [state.fact] = result.facts;
  } catch (err) {
    console.log(err);
  }
}
