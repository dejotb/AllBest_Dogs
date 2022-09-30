import {
  TIMEOUT_SEC,
  AUTOCOMPLETE_INPUT,
  DOGS_CONTAINER,
  DOGS_LIST,
} from './config.js';

// ==========================================================================
// HELPERS
// ==========================================================================

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
  setTimeout(() => {
    DOGS_CONTAINER.scrollIntoView();
  }, 100);
}

export function getOccurrence(array, el) {
  let count = 0;
  array.forEach((val) => val === el && count++);
  return count;
}

// Button UP intersection observer
const buttonToTop = document.querySelector('.btn--up');

function callback(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Show button
      buttonToTop.classList.remove('hidden');
    } else {
      // Hide button
      buttonToTop.classList.add('hidden');
    }
  });
}

const options = {
  threshold: 0.18,
};

const observer = new IntersectionObserver(callback, options);

observer.observe(DOGS_LIST);
