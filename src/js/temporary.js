import * as model from './model.js';
import { DOGS_LIST, TOP__DOGS } from './config.js';

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

  // console.log(rawCharsArray);

  const charsSet = new Set(rawCharsArray);

  const cleanedCharsArray = Array.from(charsSet).sort().slice(1);
  // console.log(charsSet);
  // console.log(cleanedCharsArray);

  const substring = ['Active', 'Alert', 'Intelligent', 'Devoted'];

  // console.log(fetchedData);

  const filteredData = await fetchedData
    .filter((dog) => dog.temperament !== undefined)
    .filter((dog) => substring.every((el) => dog.temperament.includes(el)));

  // .filter((dog) => dog.temperament.search('Active'))
  // .slice(0, 12);

  console.log(filteredData);
}

// ?
// ? categories to be used: breed_group, temperament

// document
//   .querySelector('.autocomplete__input')
//   .forEach((el) => el.addEventListener('click', scrollToView));

//! facts

// export async function showDogFact() {
//   const dogFact = document.querySelector('.fact__text');
//   await model.fetchDogsFacts();
//   dogFact.textContent = `Dog fact: ${model.state.fact}`;
// }

// BTN_FACTS.addEventListener('click', (e) => {
//   e.preventDefault();
//   showDogFact();
// });

// showDogFact();

//!
