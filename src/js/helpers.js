import { TIMEOUT_SEC } from './config.js';

export function editText(string) {
  return string.replace(' ', '_');
}

export function tempDisableEvents(e) {
  e.target.style.pointerEvents = 'none';
  e.target.onkeydown = () => false;
  setTimeout(() => {
    e.target.style.pointerEvents = 'all';
    e.target.onkeydown = () => true;
  }, TIMEOUT_SEC * 1000);
}

export function renderloader(parentElement) {
  const markup = `
        <span class="loader"></span>
    `;
  //   this._clear();
  parentElement.insertAdjacentHTML('afterbegin', markup);
}
