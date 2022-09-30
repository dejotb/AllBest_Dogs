import VanillaTilt from 'vanilla-tilt';
import * as model from '../model.js';
import { DOGS_LIST, MODAL, MODAL_LIST, BREED_WIKI_URL } from '../config.js';
import { editText } from '../helpers.js';

// ==========================================================================
// MODAL VIEW
// ==========================================================================

export function generateDogCard(dog) {
  const markup = `

  <li class='modal__card' data-id="${dog.id}" data-tilt >
    <div class="dog__image" style='background-image: url(${dog.imgUrl})'>
      <button class="modal__button">❎</button>
      <span class="loader hidden"></span>
    </div>
      <span class='dog__heart--info alert__text hidden'>Breed added to favourites! 💕</span>
    <div class='dog__caption'>
      <span class='dog__name'>${dog.name}</span>
      <span class='dog__heart'>${
        model.state.likedDogs.find((el) => el.id === dog.id) ? '💖' : '🤍'
      }</span>
    </div>
    <ul class='modal__text'>
      <li><span class="text--secondary">breed group:</span> ${
        dog.breed_group ? dog.breed_group.toLowerCase() : undefined
      }</li>
      <li><span class="text--secondary">bred for:</span> ${
        dog.bred_for ? dog.bred_for.toLowerCase() : undefined
      }</li>
      <li ><span class="text--secondary">temperament:</span> ${
        dog.temperament ? dog.temperament.toLowerCase() : undefined
      }</li>
      </ul>
      <ul class='modal__chars'>
      <li ><span class="text--secondary">life span (yrs)</span> ${
        dog.life_span.split(' years')[0]
      }</li>
      <li ><span class="text--secondary">height (cm)</span> ${dog.height}</li>
      <li ><span class="text--secondary">weight (kg)</span> ${
        dog.weight === 'NaN' ? undefined : dog.weight.toLowerCase()
      }</li>
    </ul>
       <a class='text--secondary' href="${BREED_WIKI_URL}/${editText(
    dog.name
  )}" target="_blank" rel="noopener noreferrer">📚 more details...</a>
  </li>
  `;

  MODAL_LIST.insertAdjacentHTML('afterbegin', markup);
  MODAL.classList.remove('hidden');
  document.body.classList.add('sticky__body');
  Array.from(DOGS_LIST.children).forEach((element) => {
    element.tabIndex = -1;
  });

  VanillaTilt.init(document.querySelector('.modal__card'), {
    max: 1,
    speed: 300,
  });
}
