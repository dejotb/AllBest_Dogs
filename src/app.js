require('dotenv').config();

const URL = 'https://api.thedogapi.com/v1';

const state = {
  dog: {},
  imageUrl: {},
};

async function getData(value) {
  try {
    if (!process.env.DOGS_API_KEY) {
      throw new Error('You forgot to set DOGS_API_KEY ');
    }
    const data = await fetch(`${URL}/breeds/search?q=${value}`, {
      headers: {
        'X-Api-Key': process.env.DOGS_API_KEY,
      },
    });
    const result = await data.json();

    console.log(result);

    const dog = result[0];

    state.dog = {
      name: dog.name,
      bred_for: dog.bred_for,
      breed_group: dog.breed_group,
      life_span: dog.life_span,
      imgID: dog.reference_image_id,
      temperament: dog.temperament,
    };
  } catch (err) {
    console.log(err);
  }
}

async function getImage(imageID) {
  try {
    if (!process.env.DOGS_API_KEY) {
      throw new Error('You forgot to set DOGS_API_KEY ');
    }
    const data = await fetch(`${URL}/images/${imageID}`, {
      headers: {
        'X-Api-Key': process.env.DOGS_API_KEY,
      },
    });
    const result = await data.json();
    state.imageUrl = result.url;

    console.log(state.imageUrl);
  } catch (err) {
    console.log(err);
  }
}

async function showDog(breed) {
  await getData(breed);
  const { dog } = state;
  await getImage(dog.imgID);
  const { imageUrl } = state;
  console.log(dog);

  const markup = `
  <li class="dog__item">
    <p>Name: ${dog.name}</p>
    <p>life span: ${dog.life_span}</p>
    <p>${dog.temperament}</p>
  </li>

`;
  const image = `
  <img src='${imageUrl}' alt=''>
  `;

  document.querySelector('.dog__list').insertAdjacentHTML('afterbegin', markup);
  document.querySelector('.dog__item').insertAdjacentHTML('afterbegin', image);
}

showDog('bern');
