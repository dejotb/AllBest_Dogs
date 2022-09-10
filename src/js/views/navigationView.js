// Navigation
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.btn--hamburger');
const navWrapper = document.querySelector('.nav__list--wrapper');

// buttons
// ==========================================================================
// Handle Hamburger
// ==========================================================================

const handleHamburger = (e) => {
  const hamburgerState = e.currentTarget.getAttribute('aria-expanded');
  if (hamburgerState === 'false') {
    navWrapper.classList.add('visible');
    // document.body.classList.add('sticky__body');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.classList.add('transparent');
  }
};

hamburger.addEventListener('click', handleHamburger);

// ==========================================================================
// Handle Navigation
// ==========================================================================

const handleNavigation = (e) => {
  if (e.target.closest('.hamburger')) {
    return;
  }

  if (e.target.closest('.btn--close') || e.target.closest('.nav__item')) {
    // console.log();
    hamburger.setAttribute('aria-expanded', 'false');
    navWrapper.classList.remove('visible');
    hamburger.classList.remove('transparent');
    // document.body.classList.remove('sticky__body');
  }
};

nav.addEventListener('click', handleNavigation);
