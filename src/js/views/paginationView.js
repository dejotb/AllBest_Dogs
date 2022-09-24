import { stat } from 'fs';
import * as model from '../model.js';
import {
  DOGS_LIST,
  TOP__DOGS,
  LOADER,
  PAGINATION_CONTAINER,
} from '../config.js';

import { showDog } from '../controller.js';
import {
  generateMarkup,
  getImgUrl,
  createGridMarkup,
  fetchImgUrl,
} from './view.js';

function getPaginationMarkup(filteredData, curPage = model.state.page) {
  //   const curPage = model.state.page;
  console.log(curPage);

  const numPages = Math.ceil(filteredData.length / model.state.resultsPerPage);
  // Page 1 and other pages

  if (curPage === 1 && numPages > 1) {
    return `
        <button data-goto='${
          curPage + 1
        }' class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1} ▶️</span>
        </button>
        `;
    // PAGINATION_CONTAINER.insertAdjacentHTML('afterbegin', markup);
  }
  // Last page

  if (curPage === numPages && numPages > 1) {
    return `
        <button data-goto='${
          curPage - 1
        }' class="btn--inline pagination__btn--prev">
            <span>◀️ Page ${curPage - 1}</span>
        </button>
        `;
    // return;
  }
  // Other page
  if (curPage < numPages) {
    return `
        <button data-goto='${
          curPage - 1
        }' class="btn--inline pagination__btn--prev">
            <span>◀️ Page ${curPage - 1}</span>
        </button>
        <button data-goto='${
          curPage + 1
        }' class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1} ▶️</span>
        </button>
    `;
    // PAGINATION_CONTAINER.insertAdjacentHTML('afterbegin', markup);
  }

  // Page 1 and NO other pages
  return '';
  //
}

export function showPaginationMarkup(filteredData, goToPage) {
  const markup = getPaginationMarkup(filteredData, goToPage);
  //   console.log(markup);
  //   console.log(model.state.page);

  PAGINATION_CONTAINER.insertAdjacentHTML('afterbegin', markup);
}

export function addHandlerClick(handler) {
  PAGINATION_CONTAINER.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn--inline');
    if (!btn) return;

    const goToPage = +btn.dataset.goto;

    handler(goToPage);
  });
}
