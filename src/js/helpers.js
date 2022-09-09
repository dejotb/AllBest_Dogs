import { isLabeledStatement } from 'typescript';
import { TIMEOUT_SEC, AUTOCOMPLETE_INPUT, INPUT_BOX } from './config.js';

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

export function isElementFocused(element) {
  if (document.activeElement !== element)
    AUTOCOMPLETE_INPUT.classList.remove('active');
}

export function scrollToView() {
  setTimeout(
    () => {
      document.querySelector('#main').style.minHeight = '100vh';
      document.querySelector('#main').scrollIntoView(true);
    },

    1800
  );
}
