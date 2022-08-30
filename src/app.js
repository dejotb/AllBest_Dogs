require('dotenv').config();

const URL = 'https://api.thedogapi.com/v1';

const state = {
  dogs: [],
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

    state.dogs = result.map((dog) => ({
      name: dog.name,
      bred_for: dog.bred_for,
      breed_group: dog.breed_group,
      life_span: dog.life_span,
      imgId: dog.reference_image_id,
      temperament: dog.temperament,
      height: dog.height.metric,
      weight: dog.weight.metric,
      id: dog.id,
      origin: dog.origin,
    }));
  } catch (err) {
    console.log(err);
  }
}

async function generateMarkup(dog) {
  const markup = `
    <li class="dog__item">
    <img src=${dog.imgUrl} alt='${dog.name}'>
    <p>Name: ${dog.name}</p>
    <p>life span: ${dog.life_span}</p>
    <p>${dog.temperament}</p>
    </li>

    `;
  document.querySelector('.dog__list').insertAdjacentHTML('afterbegin', markup);
}

async function getImage(dog, imageID = '9BXwUeCc2') {
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
    dog.imgUrl = result.url;

    console.log(dog);

    await generateMarkup(dog);
  } catch (err) {
    console.log(err);
  }
}

async function getUrl(dogs) {
  dogs.map((dog, index) => {
    getImage(dog, dog.imgId, index);
  });
  state.dogs = dogs;
}

async function showDog(breed) {
  const { dogs } = state;
  await getData(breed);
  await getUrl(state.dogs);
}

showDog('german');
