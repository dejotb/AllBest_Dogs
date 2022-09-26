import * as model from '../model.js';
import { DOGS_LIST, TOP__DOGS, SELECT_BUTTON, MODAL } from '../config.js';
import {
  generateMarkup,
  getImgUrl,
  createGridMarkup,
  fetchImgUrl,
} from './view.js';

const getCharList = async function (char) {
  const fetchedData = await model.state.temporary;

  console.log(fetchedData);

  const inputDogsData = fetchedData.map((element) =>
    char === 'temperament' ? element.temperament : element.breed_group
  );

  const rawCharsArray = inputDogsData.join(', ').replace(/ /g, '').split(',');

  const charsSet = new Set(rawCharsArray);

  const cleanedCharsArray = Array.from(charsSet).sort().slice(1);

  function getOccurrence(array, el) {
    let count = 0;
    array.forEach((val) => val === el && count++);
    return count;
  }

  return cleanedCharsArray.map(
    (el) => `${el} (${getOccurrence(rawCharsArray, el)})`
  );
};

SELECT_BUTTON.addEventListener('click', () => {
  MODAL.classList.remove('hidden');
  document.body.classList.add('sticky__body');
});

function addFilterOption(element, DOMElement) {
  const markup = `
  <div class='fieldset__input'>
    <input type="checkbox" id="${element
      .split(':')[0]
      .toLowerCase()}" name="${element.split(':')[0].toLowerCase()}">
    <label for="${element.split(':')[0].toLowerCase()}">${element}</label>
  </div>
`;

  document
    .querySelector(`${DOMElement}`)
    .insertAdjacentHTML('beforeend', markup);
}

/* <p>Filter breeds</p> */

export async function showFilterModal() {
  const filterBox = document.createElement('div');
  filterBox.classList.add('modal__filter');
  filterBox.innerHTML = `
  <button class="modal__button">❎</button>
  <div class="fieldset__wrapper">
    <fieldset class='fieldset__list fieldset__list--temperament'>
      <legend>Choose temperament:</legend>
    </fieldset>
  </div>
  <div class="fieldset__wrapper">
    <fieldset class='fieldset__list fieldset__list--breed-group'>
      <legend>Choose breed group:</legend>
    </fieldset>
  </div>

  <div class='filter__options'>
    <button class='filter__options--search-btn'>Submit</button>
    <button class='filter__options--close-btn'>Clear all</button>
  </div>


  `;

  MODAL.insertAdjacentElement('afterbegin', filterBox);
  // await getCharList();
  const charsListTemperament = await getCharList('temperament');

  charsListTemperament.forEach((el) =>
    addFilterOption(el, '.fieldset__list--temperament')
  );

  const charsListBreedGroup = await getCharList();

  charsListBreedGroup.forEach((el) =>
    addFilterOption(el, '.fieldset__list--breed-group')
  );
}

async function fetchDataCategories(value) {
  // try {
  //   if (!process.env.DOGS_API_KEY) {
  //     throw new Error('You forgot to set DOGS_API_KEY ');
  //   }

  //   const data = await fetch(`https://api.thedogapi.com/v1/breeds`, {
  //     headers: {
  //       'X-Api-Key': process.env.DOGS_API_KEY,
  //     },
  //   });
  //   const result = await data.json();

  //   console.log(result);

  // ? method to get breed groups
  // const breedGroups = result.map((element) => element.breed_group);
  // const set = new Set(breedGroups);
  // console.log(breedGroups);

  // ? method to get breed temperaments
  // await model.fetchAllBreedsData();
  const fetchedData = await model.state.temporary;

  const inputDogsData = fetchedData.map((element) => element.temperament);
  // console.log(breedtemperamentsLists);

  const rawCharsArray = inputDogsData.join(', ').replace(/ /g, '').split(',');

  console.log(rawCharsArray);
  // console.log(rawCharsArray);

  const charsSet = new Set(rawCharsArray);
  console.log(charsSet);

  const cleanedCharsArray = Array.from(charsSet).sort().slice(1);
  // console.log(charsSet);

  function getOccurrence(array, el) {
    let count = 0;
    array.forEach((val) => val === el && count++);
    return count;
  }

  const charOccurrence = cleanedCharsArray.map(
    (el) => `${el}: (${getOccurrence(rawCharsArray, el)})`
  );

  console.log(charOccurrence);

  const substring = ['Agile'];

  // console.log(cleanedCharsArray);

  const filteredData = await fetchedData
    .filter((dog) => dog.temperament !== undefined)
    .filter((dog) => substring.every((el) => dog.temperament.includes(el)));

  // .filter((dog) => dog.temperament.search('Active'))
  // .slice(0, 12);

  console.log(filteredData);

  model.state.dogs = filteredData;

  // model.state.dogs = [];
  DOGS_LIST.textContent = '';
  generateMarkup(model.state.dogs);
  getImgUrl(model.state.dogs);

  // console.log(model.state.dogs.length < 1);
  if (model.state.dogs.length <= 1) return;
  DOGS_LIST.classList.remove('centered--one');
}

// ?
// ? categories to be used: breed_group, temperament
