import * as model from '../model.js';
import { DOGS_LIST } from '../config.js';
import { updateBasket } from './basketView.js';
import { generateDogCard } from './modalView.js';

// ==========================================================================
// HEART VIEW
// ==========================================================================

function checkIfHeartClicked(e) {
  if (
    e.target.classList.contains('dog__heart') ||
    !e.target.closest('.dog__item')
  )
    return;

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
    return;
  }

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
