import { updateBasket } from './basketView.js';
import { generateDogCard } from './modalView.js';
import * as model from '../model.js';
import alert from './alertView.js';
import { DOGS_LIST, MODAL, MODAL_LIST } from '../config.js';

// ==========================================================================
// VIEW
// ==========================================================================

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

MODAL_LIST.addEventListener('click', (e) => {
  handleHeart(e);
});

export function closeModal(e) {
  if (
    e.target.querySelector('.modal__card') ||
    e.keyCode === 27 ||
    e.target.classList.contains('modal__button') ||
    e.target.classList.contains('modal__container')
  ) {
    MODAL_LIST.textContent = '';

    MODAL.classList.add('hidden');
    document.body.classList.remove('sticky__body');
    Array.from(DOGS_LIST.children).forEach((element) => {
      element.tabIndex = 0;
    });
    if (!MODAL.querySelector('.modal__filter')) return;
    MODAL.querySelector('.modal__filter').remove();
  }
}
