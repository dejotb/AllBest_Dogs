import VanillaTilt from 'vanilla-tilt';
import { updateBasket } from './basketView.js';
import * as model from '../model.js';
import { editText } from '../helpers.js';
import alert from './alertView.js';
import { BREED_WIKI_URL, DOGS_LIST, MODAL, MODAL_LIST } from '../config.js';

const dogList = document.querySelector('.dogs__list');

export async function createGridMarkup(dog) {
  const markup = `
      <li class="dog__item" data-id="${dog.id}" tabindex="0">
        <div class="dog__image">
            <span class="loader hidden"></span>
        </div>
        <div class='dog__caption'>
          <button class='dog__details' title="view details">🔎</button>
          <span class='dog__name'>${dog.name}</span>
          <span class='dog__heart' >${
            model.state.likedDogs.find((el) => el.id === dog.id) ? '💖' : '🤍'
          }</span>
        </div>
        <span class='dog__heart--info alert__text hidden'>Breed added to favourites! 💕</span>
      </li>`;
  dogList.insertAdjacentHTML('beforeend', markup);
}

export function generateDogCard(dog) {
  const markup = `

  <li class='modal__card' data-id="${dog.id}" data-tilt >
      <div class="dog__image" style='background-image: url(${dog.imgUrl})'>
        <button class="modal__button">❎</button>
        <span class="loader hidden"></span>
      </div>
      <span class='dog__heart--info alert__text hidden'>Breed added to favourites! 💕</span>
      <div class='dog__caption'>
        <span class='dog__name'>${dog.name}</span>
        <span class='dog__heart'>${
          model.state.likedDogs.find((el) => el.id === dog.id) ? '💖' : '🤍'
        }</span>

      </div>

      <ul class='modal__text'>
        <li><span class="text--secondary">breed group:</span> ${
          dog.breed_group ? dog.breed_group.toLowerCase() : undefined
        }</li>
        <li><span class="text--secondary">bred for:</span> ${
          dog.bred_for ? dog.bred_for.toLowerCase() : undefined
        }</li>
        <li ><span class="text--secondary">temperament:</span> ${
          dog.temperament ? dog.temperament.toLowerCase() : undefined
        }</li>
        </ul>
        <ul class='modal__chars'>
        <li ><span class="text--secondary">life span (yrs)</span> ${
          dog.life_span.split(' years')[0]
        }</li>
        <li ><span class="text--secondary">height (cm)</span> ${dog.height}</li>
        <li ><span class="text--secondary">weight (kg)</span> ${
          dog.weight === 'NaN' ? undefined : dog.weight.toLowerCase()
        }</li>
        </ul>
        <a class='text--secondary' href="${BREED_WIKI_URL}/${editText(
    dog.name
  )}" target="_blank" rel="noopener noreferrer">📚 more details...</a>
    </li>
  `;

  MODAL_LIST.insertAdjacentHTML('afterbegin', markup);
  MODAL.classList.remove('hidden');
  document.body.classList.add('sticky__body');
  Array.from(DOGS_LIST.children).forEach((element) => {
    element.tabIndex = -1;
  });

  VanillaTilt.init(document.querySelector('.modal__card'), {
    max: 1,
    speed: 300,
  });
}

function checkIfHeartClicked(e) {
  if (e.target.classList.contains('dog__heart')) return;

  const activeDogId = e.target.closest('.dog__item').dataset.id;
  const dog = model.state.dogs.find((el) => el.id === +activeDogId);
  generateDogCard(dog);
}

DOGS_LIST.addEventListener('click', checkIfHeartClicked);
DOGS_LIST.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    checkIfHeartClicked(e);
  }
});

export function centerDogsListGrid() {
  if (model.state.dogs.length >= 3) {
    DOGS_LIST.classList.remove('centered--two');
    DOGS_LIST.classList.remove('centered--one');
  }
  if (model.state.dogs.length <= 1) {
    DOGS_LIST.classList.add('centered--one');
    DOGS_LIST.classList.remove('centered--two');
  }
  if (model.state.dogs.length === 2) {
    DOGS_LIST.classList.add('centered--two');
    DOGS_LIST.classList.remove('centered--one');
  }
}

export async function generateMarkup(dogs) {
  dogs.map((dog) => createGridMarkup(dog));
  if (!dogs.length) {
    const markup = `We coudn't find such a dog breed. Please try to find some other 🐶`;
    alert(markup);
  }

  centerDogsListGrid();
}

export async function getImgUrl(dogs) {
  await dogs.map((dog) => model.fetchImgUrl(dog));
}

export function handleHeart(e) {
  if (!e.target.classList.contains('dog__heart')) return;
  const heart = e.target;

  const [likedDog] = model.state.dogs.filter(
    (dog) => dog.id === +heart.closest('li').dataset.id
  );

  // check if selected liked dog is visible in DOG__LIST
  if (!likedDog || !DOGS_LIST.querySelector('.dog__item')) {
    const filteredLikedDogs = model.state.likedDogs.filter(
      (el) => el.id !== +e.target.closest('.modal__card').dataset.id
    );
    model.state.likedDogs = filteredLikedDogs;
    heart.remove();
    updateBasket(e.target.closest('.modal__card'));
    return;
  }

  // ?

  if (model.state.likedDogs.find((el) => el.id === likedDog.id)) {
    const filteredLikedDogs = model.state.likedDogs.filter(
      (el) => el.id !== likedDog.id
    );
    model.state.likedDogs = filteredLikedDogs;
    heart.textContent = '🤍';
  } else {
    model.state.likedDogs.push(likedDog);

    document.querySelector('.btn--hamburger').classList.add('heart-beat');
    e.target
      .closest('[data-id]')
      .querySelector('.dog__heart--info')
      .classList.remove('hidden');

    setTimeout(() => {
      document.querySelector('.btn--hamburger').classList.remove('heart-beat');
      e.target
        .closest('[data-id]')
        .querySelector('.dog__heart--info')
        .classList.add('hidden');
    }, 2000);
    heart.textContent = '💖';
  }

  const editedHeart = Array.from(DOGS_LIST.children).find(
    (el) => +el.dataset.id === likedDog.id
  );

  editedHeart.querySelector('.dog__heart').textContent = heart.textContent;

  updateBasket(likedDog);
  localStorage.setItem('likedDogs', JSON.stringify(model.state.likedDogs));
}

dogList.addEventListener('click', handleHeart);
