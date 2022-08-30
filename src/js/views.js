import IMAGE from '../imgs/dog-unknown.webp';

const dogList = document.querySelector('.dog__list');

export async function createMarkup(dog) {
  const markup = `
      <li class="dog__item" data-id="${dog.id}">
      <img class="dog__image" src='' alt='${dog.name}'>
      <p>Name: ${dog.name}</p>
      <p>life span: ${dog.life_span}</p>
      <p>${dog.temperament}</p>
      </li>

      `;
  dogList.insertAdjacentHTML('afterbegin', markup);
}

export async function addImageUrlToMarkup(dogListItems, dogId, dogImgUrl) {
  const addImage = dogListItems.find(
    (listItem) => +listItem.getAttribute('data-id') === dogId
  );
  if (dogImgUrl === undefined || !dogImgUrl) {
    addImage.querySelector('img').src = IMAGE;
  } else addImage.querySelector('img').src = dogImgUrl;
}
