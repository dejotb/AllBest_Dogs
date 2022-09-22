import * as model from '../model.js';
import { DOGS_LIST, TOP__DOGS } from '../config.js';
import {
  generateMarkup,
  getImgUrl,
  createGridMarkup,
  fetchImgUrl,
} from './view.js';

export async function fetchDataCategories(value) {
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
