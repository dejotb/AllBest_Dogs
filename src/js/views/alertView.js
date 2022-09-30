import { DOGS_LIST } from '../config.js';

// ==========================================================================
// ALERT VIEW
// ==========================================================================

export default function showAlertText(markup) {
  DOGS_LIST.textContent = '';
  const alertText = document.createElement('li');
  alertText.classList.add('alert__text');
  alertText.textContent = markup;
  DOGS_LIST.appendChild(alertText);
  DOGS_LIST.classList.add('centered--one');
}
