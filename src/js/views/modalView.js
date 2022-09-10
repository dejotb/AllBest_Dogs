import { DOG_LIST, MODAL } from '../config.js';

export function closeModal(e) {
  if (e.target.querySelector('.modal__card') || e.keyCode === 27) {
    MODAL.textContent = '';
    MODAL.classList.add('hidden');
    document.body.classList.remove('sticky__body');
    Array.from(DOG_LIST.children).forEach((element) => {
      element.tabIndex = 0;
    });
  }
}
