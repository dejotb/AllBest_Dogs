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

    console.log(result);

    // ? method to get breed groups
    // const breedGroups = result.map((element) => element.breed_group);
    // const set = new Set(breedGroups);
    // console.log(breedGroups);

    // ? method to get breed temperaments

    const breedtemperamentsLists = result.map((element) => element.temperament);

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

// fetchDataCategories();

// ?
// ? categories to be used: breed_group, temperament
