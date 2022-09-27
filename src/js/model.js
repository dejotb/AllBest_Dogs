import IMAGE__UNKNOWN from 'url:../imgs/dog-unknown.svg';
import {
  API_URL_BREED,
  API_URL_BREEDS,
  API_URL_IMAGES,
  RES_PER_PAGE,
  LOADER,
  POPULAR,
} from './config.js';
import alert from './views/alertView.js';
import { generateMarkup, getImgUrl, createGridMarkup } from './views/view.js';

export const state = {
  dogs: [],
  breedSuggestions: [],
  breedList: [],
  likedDogs: [],
  popular: POPULAR,
  temporary: [],
  filteredData: [],
  resultsPerPage: RES_PER_PAGE,
  page: 1,
};

// ==========================================================================
// Local Storage State
// ==========================================================================

const retrievedLikedDogs = localStorage.getItem('likedDogs');

state.likedDogs = JSON.parse(retrievedLikedDogs)
  ? JSON.parse(retrievedLikedDogs)
  : [];

// ==========================================================================
//
// ==========================================================================

export function createDogsObjects(dogs) {
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
    origin: dog.origin,
  }));
}

// used in searchView, selectView, filterView
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
    state.temporary = await createDogsObjects(result);
  } catch (err) {
    const markup = err;
    alert(markup);
    console.log(err);
  }
}

//

export function getSearchResultsPage(filteredData, page = state.page) {
  const start = (page - 1) * state.resultsPerPage;
  const end = page * state.resultsPerPage;
  return filteredData.slice(start, end);
}

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
    state.dogs = await createDogsObjects(result);
    state.filteredData = state.dogs; // to check
  } catch (err) {
    const markup = err;
    alert(markup);
    console.log(err);
  }
}

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
        const result = await data.json();
        dog.imgUrl = result.url;
        if (!data.ok) {
          throw new Error(`Error! status: ${data.status}`);
        }
      }

      addImage.querySelector(
        '.dog__image'
      ).style.backgroundImage = `url('${dog.imgUrl}')`;

      listItem.querySelector('.loader').classList.add('hidden');
      break;
    } catch (err) {
      currentTry++;
      console.log(err, `failed attempt ${currentTry}`);

      if (currentTry >= 3) {
        addImage.querySelector(
          '.dog__image'
        ).style.backgroundImage = `url('${IMAGE__UNKNOWN}')`;

        listItem.querySelector('.loader').classList.add('hidden');
        break;
      }
    }
  }
}
