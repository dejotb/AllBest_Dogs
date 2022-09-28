import { DOGS_LIST, MODAL, MODAL_LIST } from '../config.js';
import { handleHeart } from './view.js';

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

MODAL_LIST.addEventListener('click', (e) => {
  handleHeart(e);
});
