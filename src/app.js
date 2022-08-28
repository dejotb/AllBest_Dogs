require('dotenv').config();

const URL = 'https://api.thedogapi.com/v1';

async function getData() {
  try {
    if (!process.env.DOGS_API_KEY) {
      throw new Error('You forgot to set DOGS_API_KEY ');
    }
    const data = await fetch(`${URL}/images/S1T8Ee9Nm`, {
      headers: {
        'X-Api-Key': process.env.DOGS_API_KEY,
      },
    });
    const result = await data.json();
    console.log(result);
    const markup = `
    <img src='${result.url}' alt=''>
`;

    document.querySelector('.image').insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    console.log(err);
  }
}

getData();
