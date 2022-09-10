export async function fetchDataCategories(value) {
  try {
    if (!process.env.DOGS_API_KEY) {
      throw new Error('You forgot to set DOGS_API_KEY ');
    }
    // if (value === '' || value === undefined)
    //   console.log(`search for dog's breed`);

    const data = await fetch(`https://api.thedogapi.com/v1/breeds`, {
      headers: {
        'X-Api-Key': process.env.DOGS_API_KEY,
      },
    });
    const result = await data.json();

    // console.log(result);

    // ? method to get breed groups
    // const breedGroups = result.map((element) => element.breed_group);
    // const set = new Set(breedGroups);
    // console.log(breedGroups);

    // ? method to get breed temperaments

    const breedtemperamentsLists = result.map((element) => element.bred_for);

    // console.log(breedtemperamentsLists);

    const breedTemperaments = breedtemperamentsLists
      .join(', ')
      .replace(/ /g, '')
      .split(',');

    console.log(breedTemperaments);

    const set = new Set(breedTemperaments);

    console.log(set);
  } catch (err) {
    console.log(err);
  }
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
