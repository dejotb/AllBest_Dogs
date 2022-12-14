// ==========================================================================
// API links
// ==========================================================================

export const API_URL_BREED = 'https://api.thedogapi.com/v1/breeds/search?q=';
export const API_URL_BREEDS = 'https://api.thedogapi.com/v1/breeds';
export const API_URL_IMAGES = 'https://api.thedogapi.com/v1/images/';

// ==========================================================================
// DOM Elements
// ==========================================================================

export const BODY = document.querySelector('body');

export const MAIN = document.querySelector('#main');

export const DOGS_CONTAINER = document.querySelector('.dogs__container');

export const DOGS_FORM = document.querySelector('#dogs__form');

export const DOGS_LIST = document.querySelector('.dogs__list');

export const TOP__DOGS = document.querySelector('#dogs__select');

export const INPUT_BOX = document.querySelector('input');

export const AUTOCOMPLETE_INPUT = document.querySelector(
  '.autocomplete__input'
);

export const LOADER = document.querySelector('.loader__container');

export const MODAL = document.querySelector('.modal__container');

export const MODAL_LIST = document.querySelector('.modal__list');

export const BTN_SEARCH = document.querySelector('#search__button');

export const BTN_BASKET = document.querySelector('.btn--hamburger');

export const SELECT_BUTTON = document.querySelector('.select__button');

export const BASKET = document.querySelector('.basket');

export const BASKET_WRAPPER = document.querySelector('.basket__list--wrapper');

export const BASKET_ITEMS = document.querySelector('.basket__items');

export const PAGINATION_CONTAINER = document.querySelector(
  '.pagination__container'
);

// ==========================================================================
// TIMEOUT time is sec
// ==========================================================================

export const TIMEOUT_SEC = 0.5;
export const RES_PER_PAGE = 12;

// ==========================================================================
// LINK URL
// ==========================================================================

export const BREED_WIKI_URL = 'https://en.wikipedia.org/wiki';

// ==========================================================================
// Most popular breeds Array
// ==========================================================================

export const DOGS_POPULAR = [
  {
    bred_for: 'Herding, Guard dog',
    breed_group: 'Herding',
    height: '56 - 66',
    id: 115,
    imgId: 'SJyBfg5NX',
    imgUrl: 'https://cdn2.thedogapi.com/images/SJyBfg5NX_1280.jpg',
    life_span: '10 - 13 years',
    name: 'German Shepherd Dog',
    temperament:
      'Alert, Loyal, Obedient, Curious, Confident, Intelligent, Watchful, Courageous',
    weight: '23 - 41',
  },
  {
    bred_for: 'Water retrieving',
    breed_group: 'Sporting',
    height: '55 - 62',
    id: 149,
    imgId: 'B1uW7l5VX',
    imgUrl: 'https://cdn2.thedogapi.com/images/B1uW7l5VX_1280.jpg',
    life_span: '10 - 13 years',
    name: 'Labrador Retriever',
    temperament:
      'Kind, Outgoing, Agile, Gentle, Intelligent, Trusting, Even Tempered',
    weight: '25 - 36',
  },
  {
    bred_for: 'Small vermin hunting',
    breed_group: 'Toy',
    height: '20 - 23',
    id: 264,
    imgId: 'B12BnxcVQ',
    imgUrl: 'https://cdn2.thedogapi.com/images/B12BnxcVQ_1280.jpg',
    life_span: '12 - 16 years',
    name: 'Yorkshire Terrier',
    temperament: 'Bold, Independent, Confident, Intelligent, Courageous',
    weight: '2 - 3',
  },
  {
    bred_for: 'Draft work',
    breed_group: 'Working',
    height: '58 - 70',
    id: 41,
    imgId: 'S1fFlx5Em',
    imgUrl: 'https://cdn2.thedogapi.com/images/S1fFlx5Em_1280.jpg',
    life_span: '7 - 10 years',
    name: 'Bernese Mountain Dog',
    temperament: 'Affectionate, Loyal, Intelligent, Faithful',
    weight: '29 - 54',
  },
  {
    bred_for: 'Fox, badger, vermin hunting',
    breed_group: 'Terrier',
    height: '25 - 28',
    id: 256,
    imgId: 'Bkdx2g5Em',
    imgUrl: 'https://cdn2.thedogapi.com/images/Bkdx2g5Em_1280.jpg',
    life_span: '15 - 20 years',
    name: 'West Highland White Terrier',
    temperament: 'Hardy, Friendly, Alert, Independent, Gay, Active, Courageous',
    weight: '7 - 10',
  },
  {
    bred_for: '',
    breed_group: 'Terrier',
    height: '43 - 48',
    id: 16,
    imgId: 'rJIakgc4m',
    imgUrl: 'https://cdn2.thedogapi.com/images/rJIakgc4m_1280.jpg',
    life_span: '12 - 15 years',
    name: 'American Staffordshire Terrier',
    temperament: 'Tenacious, Friendly, Devoted, Loyal, Attentive, Courageous',
    weight: '23 - 27',
  },
  {
    bred_for: 'Sled pulling',
    breed_group: 'Working',
    height: '51 - 60',
    id: 226,
    imgId: 'S17ZilqNm',

    imgUrl: 'https://cdn2.thedogapi.com/images/S17ZilqNm_1280.jpg',
    life_span: '12 years',

    name: 'Siberian Husky',
    temperament: 'Outgoing, Friendly, Alert, Gentle, Intelligent',

    weight: '16 - 27',
  },
  {
    bred_for: 'Ratting',
    breed_group: 'Terrier',
    height: '30 - 36',
    id: 168,
    imgId: 'SJIUQl9NX',
    imgUrl: 'https://cdn2.thedogapi.com/images/SJIUQl9NX_1280.jpg',
    life_span: '12 - 14 years',
    name: 'Miniature Schnauzer',
    temperament: 'Fearless, Friendly, Spirited, Alert, Obedient, Intelligent',
    weight: '5 - 9',
  },

  {
    bred_for: 'Lapdog',
    breed_group: 'Non-Sporting',
    height: '28 - 30',
    id: 113,
    imgId: 'HyWNfxc47',
    imgUrl: 'https://cdn2.thedogapi.com/images/HyWNfxc47_1280.jpg',
    life_span: '9 - 11 years',
    name: 'French Bulldog',
    temperament:
      'Playful, Affectionate, Keen, Sociable, Lively, Alert, Easygoing, Patient, Athletic, Bright',

    weight: '13',
  },
  {
    bred_for: 'Retrieving',
    breed_group: 'Sporting',
    height: '55 - 61',
    id: 121,
    imgId: 'HJ7Pzg5EQ',
    imgUrl: 'https://cdn2.thedogapi.com/images/HJ7Pzg5EQ_1280.jpg',
    life_span: '10 - 12 years',
    name: 'Golden Retriever',
    temperament:
      'Intelligent, Kind, Reliable, Friendly, Trustworthy, Confident',
    weight: '25 - 34',
  },
  {
    bred_for: 'Lapdog',
    breed_group: 'Toy',
    height: '25 - 30',
    id: 201,
    imgId: 'HyJvcl9N7',
    imgUrl: 'https://cdn2.thedogapi.com/images/HyJvcl9N7_1280.jpg',
    life_span: '12 - 14 years',
    name: 'Pug',
    temperament:
      'Docile, Clever, Charming, Stubborn, Sociable, Playful, Quiet, Attentive',
    weight: '6 - 8',
  },
  {
    bred_for: 'Rabbit, hare hunting',
    breed_group: 'Hound',
    height: '33 - 38',
    id: 31,
    imgId: 'Syd4xxqEm',
    imgUrl: 'https://cdn2.thedogapi.com/images/Syd4xxqEm_1280.jpg',
    life_span: '13 - 16 years',
    name: 'Beagle',
    temperament:
      'Amiable, Even Tempered, Excitable, Determined, Gentle, Intelligent',
    weight: '9 - 16',
  },

  {
    bred_for: 'Sheep herder',
    breed_group: 'Herding',
    height: '46 - 56',
    id: 50,
    imgId: 'sGQvQUpsp',
    imgUrl: 'https://cdn2.thedogapi.com/images/sGQvQUpsp.jpg',
    life_span: '12 - 16 years',
    name: 'Border Collie',
    temperament: 'Tenacious, Keen, Energetic, Responsive, Alert, Intelligent',
    weight: '14 - 20',
  },
  {
    bred_for: 'Flushing small birds, companion',
    breed_group: 'Toy',
    height: '30 - 33',
    id: 71,
    imgId: 'HJRBbe94Q',
    imgUrl: 'https://cdn2.thedogapi.com/images/HJRBbe94Q_1280.jpg',
    life_span: '10 - 14 years',
    name: 'Cavalier King Charles Spaniel',
    temperament:
      'Fearless, Affectionate, Sociable, Patient, Playful, Adaptable',
    weight: '6 - 8',
  },
];

export const DOGS_DANGEROUS = [
  {
    bred_for: 'Fighting',
    breed_group: 'Terrier',
    height: '43 - 53',
    id: 15,
    imgId: 'HkC31gcNm',
    imgUrl: 'https://cdn2.thedogapi.com/images/HkC31gcNm_1280.png',
    life_span: '10 - 15 years',
    name: 'American Pit Bull Terrier',
    temperament:
      'Strong Willed, Stubborn, Friendly, Clownish, Affectionate, Loyal, Obedient, Intelligent, Courageous',
    weight: '14 - 27',
  },
  {
    bred_for: 'Big-game hunting',
    breed_group: 'Working',
    height: '60 - 69',
    id: 95,
    imgId: 'S1nhWx94Q',
    imgUrl: 'https://cdn2.thedogapi.com/images/S1nhWx94Q_1280.jpg',
    life_span: '10 - 12 years',
    name: 'Dogo Argentino',
    temperament:
      'Friendly, Affectionate, Cheerful, Loyal, Tolerant, Protective',
    weight: '36 - 45',
  },
  {
    bred_for: undefined,
    breed_group: 'Working',
    height: '56 - 65',
    id: 185,
    imgId: 'S1V3Qeq4X',
    imgUrl: 'https://cdn2.thedogapi.com/images/S1V3Qeq4X_1280.jpg',
    life_span: '10 - 12 years',
    name: 'Perro de Presa Canario',
    temperament: 'Strong Willed, Suspicious, Gentle, Dominant, Calm',
    weight: '40 - 50',
  },
  {
    bred_for: undefined,
    breed_group: 'Working',
    height: '61 - 79',
    id: 170,
    imgId: '',
    imgUrl: 'http://localhost:1234/dog-unknown.df62e24f.svg?1664461249495',
    life_span: '8 - 10 years',
    name: 'Neapolitan Mastiff',
    temperament:
      'Stubborn, Fearless, Obedient, Dominant, Protective, Trainable',
    weight: '50 - 91',
  },
  {
    bred_for: 'Tracking, herding and controlling livestock and large game',
    breed_group: 'Working',
    height: '60 - 75',
    id: 109,
    imgId: '',
    imgUrl: 'http://localhost:1234/dog-unknown.df62e24f.svg?1664461328458',
    life_span: '10 - 12 years',
    name: 'Fila Brasileiro',
    temperament: 'Docile, Loyal, Obedient, Determined, Brave, Courageous',
    weight: '41 - 45',
  },
  {
    bred_for: 'Guarding the homestead, farm work.',
    breed_group: 'Working',
    height: '56 - 69',
    id: 48,
    imgId: 'HyOjge5Vm',
    imgUrl: 'https://cdn2.thedogapi.com/images/HyOjge5Vm_1280.jpg',
    life_span: '10 - 12 years',
    name: 'Boerboel',
    temperament: 'Obedient, Confident, Intelligent, Dominant, Territorial',
    weight: '50 - 91',
  },
  {
    bred_for: undefined,
    breed_group: 'Working',
    height: '56 - 69',
    id: 10,
    imgId: 'pk1AAdloG',
    imgUrl: 'https://cdn2.thedogapi.com/images/pk1AAdloG.jpg',
    life_span: '10 - 12 years',
    name: 'American Bulldog',
    temperament:
      'Friendly, Assertive, Energetic, Loyal, Gentle, Confident, Dominant',
    weight: '27 - 54',
  },
  {
    bred_for: 'Cattle drover, guardian, draft',
    breed_group: 'Working',
    height: '56 - 69',
    id: 210,
    imgId: 'r1xXEgcNX',
    imgUrl: 'https://cdn2.thedogapi.com/images/r1xXEgcNX_1280.jpg',
    life_span: '8 - 10 years',
    name: 'Rottweiler',
    temperament:
      'Steady, Good-natured, Fearless, Devoted, Alert, Obedient, Confident, Self-assured, Calm, Courageous',
    weight: '34 - 50',
  },
  {
    bred_for: 'Guardian, cart pulling, hunting',
    breed_group: 'Non-Sporting',
    height: '43 - 51',
    id: 81,
    imgId: 'ry8KWgqEQ',
    imgUrl: 'https://cdn2.thedogapi.com/images/ry8KWgqEQ_1280.jpg',
    life_span: '12 - 15 years',
    name: 'Chow Chow',
    temperament: 'Aloof, Loyal, Independent, Quiet',
    weight: '18 - 32',
  },
  {
    bred_for: 'Guardian',
    breed_group: 'Working',
    height: '61 - 71',
    id: 94,
    imgId: 'HyL3bl94Q',
    imgUrl: 'https://cdn2.thedogapi.com/images/HyL3bl94Q_1280.jpg',
    life_span: '10 years',
    name: 'Doberman Pinscher',
    temperament:
      'Fearless, Energetic, Alert, Loyal, Obedient, Confident, Intelligent',
    weight: '30 - 40',
  },
  {
    bred_for: 'Hunting bears',
    breed_group: 'Working',
    height: '61 - 71',
    id: 6,
    imgId: 'BFRYBufpm',
    imgUrl: 'https://cdn2.thedogapi.com/images/BFRYBufpm.jpg',
    life_span: '10 - 14 years',
    name: 'Akita',
    temperament:
      'Docile, Alert, Responsive, Dignified, Composed, Friendly, Receptive, Faithful, Courageous',
    weight: '29 - 52',
  },
  {
    bred_for: 'Big game hunting, guarding',
    breed_group: 'Hound',
    heiht: '61 - 69',
    id: 209,
    imgId: 'By9zNgqE7',
    imgUrl: 'https://cdn2.thedogapi.com/images/By9zNgqE7_1280.jpg',
    life_span: '10 - 12 years',
    name: 'Rhodesian Ridgeback',
    temperament:
      'Strong Willed, Mischievous, Loyal, Dignified, Sensitive, Intelligent',
    weight: '34 - 36',
  },
];
