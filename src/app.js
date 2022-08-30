require('dotenv').config();

const dogList = document.querySelector('.dog__list');

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

async function createMarkup(dog) {
  const markup = `
    <li class="dog__item" data-id="${dog.id}">
    <img src='' alt='${dog.name}'>
    <p>Name: ${dog.name}</p>
    <p>life span: ${dog.life_span}</p>
    <p>${dog.temperament}</p>
    </li>

    `;
  dogList.insertAdjacentHTML('afterbegin', markup);
}

async function addImageUrlToMarkup(dogItems, dogId, dogImgUrl) {
  const addImage = dogItems.find(
    (item) => +item.getAttribute('data-id') === dogId
  );
  addImage.querySelector('img').src = dogImgUrl;
}

async function addImgUrl(dog, imgId = '9BXwUeCc2') {
  try {
    if (!process.env.DOGS_API_KEY) {
      throw new Error('You forgot to set DOGS_API_KEY ');
    }
    const data = await fetch(`${URL}/images/${imgId}`, {
      headers: {
        'X-Api-Key': process.env.DOGS_API_KEY,
      },
    });

    const result = await data.json();
    dog.imgUrl = result.url;

    const dogId = dog.id;

    const dogItems = [...document.querySelectorAll('.dog__item')];

    await addImageUrlToMarkup(dogItems, dogId, dog.imgUrl);
  } catch (err) {
    console.log(err);
  }
}

async function getImgUrl(dogs) {
  await dogs.map((dog) => addImgUrl(dog, dog.imgId));
}

async function generateMarkup(dogs) {
  dogs.map((dog) => createMarkup(dog));
}

async function showDog(breed) {
  await getData(breed);
  await generateMarkup(state.dogs);

  await getImgUrl(state.dogs);
}

showDog('corg');
