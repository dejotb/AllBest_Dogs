import * as model from '../model.js';
import { DOG_LIST, MODAL, MODAL_LIST } from '../config.js';
import { handleHeart } from './view.js';

export function closeModal(e) {
  if (e.target.querySelector('.modal__card') || e.keyCode === 27) {
    MODAL_LIST.textContent = '';
    MODAL.classList.add('hidden');
    document.body.classList.remove('sticky__body');
    Array.from(DOG_LIST.children).forEach((element) => {
      element.tabIndex = 0;
    });
  }
}

MODAL_LIST.addEventListener('click', (e) => {
  handleHeart(e);
  const heart = e.target;
  // console.log(heart.textContent);
  const [likedDog] = model.state.dogs.filter(
    (dog) => dog.id === +heart.closest('li').dataset.id
  );
  const editedHeart = Array.from(DOG_LIST.children).find(
    (el) => +el.dataset.id === likedDog.id
  );

  editedHeart.querySelector('.dog__heart').textContent = heart.textContent;
  // console.log(likedDog.id);
});
