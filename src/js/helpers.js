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

export function scrollToView() {
  setTimeout(
    () => {
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

export function getOccurrence(array, el) {
  let count = 0;
  array.forEach((val) => val === el && count++);
  return count;
}

// Button UP intersection observe

const target = document.querySelector('footer');

const scrollToTopBtn = document.querySelector('.btn--up');
const rootElement = document.documentElement;

function callback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Show button
      scrollToTopBtn.classList.remove('hidden');
    } else {
      // Hide button
      scrollToTopBtn.classList.add('hidden');
    }
  });
}

function scrollToTop() {
  rootElement.scrollTo({
    bottom: 0,
    behavior: 'smooth',
  });
}
scrollToTopBtn.addEventListener('click', scrollToTop);

const observer = new IntersectionObserver(callback);

observer.observe(target);
