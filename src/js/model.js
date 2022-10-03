import IMAGE__UNKNOWN from 'url:../imgs/dog-unknown.svg'; // image visible when dog breed image is not available
import {
  API_URL_BREED,
  API_URL_BREEDS,
  API_URL_IMAGES,
  RES_PER_PAGE,
  LOADER,
  DOGS_POPULAR,
  DOGS_DANGEROUS,
} from './config.js';
import alert from './views/alertView.js';

// ==========================================================================
// MODEL
// ==========================================================================

export const state = {
  dogs: [],
  breedSuggestions: [],
  likedDogs: [],
  temporary: [],
  filteredData: [],
  popular: DOGS_POPULAR,
  dangerous: DOGS_DANGEROUS,
  resultsPerPage: RES_PER_PAGE,
  page: 1,
};

// Local Storage State
const retrievedLikedDogs = localStorage.getItem('likedDogs');

state.likedDogs = JSON.parse(retrievedLikedDogs)
  ? JSON.parse(retrievedLikedDogs)
  : [];

// create object with dog data
function createDogsObject(dogs) {
  return dogs.map((dog) => ({
    name: dog.name,
    bred_for: dog.bred_for,
    breed_group: dog.breed_group,
    life_span: dog.life_span,
    imgId: !dog.reference_image_id ? '' : dog.reference_image_id,
    temperament: dog.temperament,
    height: dog.height.metric,
    weight: dog.weight.metric,
    id: dog.id,
  }));
}

// fetch all basic breeds data and push to state arrays
// used in searchView
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

    // add all breeds names to array
    state.breedSuggestions = result.map((item) => item.name);

    // add all breeds objects to array
    state.temporary = await createDogsObject(result);
  } catch (err) {
    alert(err);
  }
}

// fetch specific breed based on breed name input
// used in controller
export async function fetchDogsData(value) {
  try {
    if (!process.env.DOGS_API_KEY) {
      throw new Error('You forgot to set DOGS_API_KEY ');
    }
    if (value === '' || value === undefined)
      console.log(`search for dog's breed`);

    LOADER.querySelector('.loader').classList.remove('hidden');

    const data = await fetch(`${API_URL_BREED}${value}`, {
      headers: {
        'X-Api-Key': process.env.DOGS_API_KEY,
      },
    });
    const result = await data.json();
    LOADER.querySelector('.loader').classList.add('hidden');

    // add found breeds objects to array
    state.dogs = await createDogsObject(result);

    state.filteredData = state.dogs;
  } catch (err) {
    alert(err);
  }
}
// fetch image to  dog object
// used in view
export async function fetchImgUrl(dog) {
  const { id } = dog;
  const dogListItems = [...document.querySelectorAll('.dog__item')];
  const listItem = dogListItems.find(
    (item) => +item.getAttribute('data-id') === id
  );
  const addImage = dogListItems.find(
    (dogItem) => +dogItem.getAttribute('data-id') === dog.id
  );

  let currentTry = 0;
  while (true) {
    try {
      if (dog.imgId.length === 0) {
        dog.imgUrl = IMAGE__UNKNOWN;
      } else {
        if (!process.env.DOGS_API_KEY) {
          throw new Error('You forgot to set DOGS_API_KEY ');
        }

        listItem.querySelector('.loader').classList.remove('hidden');

        const data = await fetch(`${API_URL_IMAGES}${dog.imgId}`, {
          headers: {
            'X-Api-Key': process.env.DOGS_API_KEY,
          },
        });
        if (data.status === 429) {
          throw new Error(`Too many Requests! 💩 Try again later!`);
        }
        const result = await data.json();
        dog.imgUrl = result.url;
      }

      // set image as a background image of every dog card
      addImage.querySelector(
        '.dog__image'
      ).style.backgroundImage = `url('${dog.imgUrl}')`;

      listItem.querySelector('.loader').classList.add('hidden');
      break;
    } catch (err) {
      currentTry++;

      if (currentTry >= 3) {
        addImage.querySelector(
          '.dog__image'
        ).style.backgroundImage = `url('${IMAGE__UNKNOWN}')`;

        listItem.querySelector('.loader').classList.add('hidden');

        alert(err.message);
        break;
      }
    }
  }
}
