import {
  TIMEOUT_SEC,
  AUTOCOMPLETE_INPUT,
  MAIN,
  DOGS_CONTAINER,
  DOGS_LIST,
} from './config.js';

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

export function scrollToView(e) {
  setTimeout(
    () => {
      // DOGS_CONTAINER.style.minHeight = '100vh';
      DOGS_CONTAINER.scrollIntoView();
    },

    100
  );
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  localStorage.getItem(key);
}
