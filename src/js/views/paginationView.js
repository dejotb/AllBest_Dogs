import * as model from '../model.js';
import { PAGINATION_CONTAINER } from '../config.js';

// ==========================================================================
// PAGINATION VIEW
// ==========================================================================

// get current page numbers markup
function getPaginationMarkup(filteredData, curPage = model.state.page) {
  const numPages = Math.ceil(filteredData.length / model.state.resultsPerPage);

  // Page 1 and other pages
  if (curPage === 1 && numPages > 1) {
    return `
    <a href="#dogs" class="pagination__btn--up" title="go up" role="button">🔼</a>
        <button data-goto='${
          curPage + 1
        }' class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1} ▶️</span>
        </button>
        `;
  }

  // Last page
  if (curPage === numPages && numPages > 1) {
    return `

        <button data-goto='${
          curPage - 1
        }' class="btn--inline pagination__btn--prev">
            <span>◀️ Page ${curPage - 1}</span>
        </button>
        <a href="#dogs" class="pagination__btn--up" title="go up" role="button">🔼</a>
        `;
  }

  // Other page
  if (curPage < numPages) {
    return `
        <button data-goto='${
          curPage - 1
        }' class="btn--inline pagination__btn--prev">
            <span>◀️ Page ${curPage - 1}</span>
        </button>
        <a href="#dogs" class="pagination__btn--up" title="go up" role="button">🔼</a>
        <button data-goto='${
          curPage + 1
        }' class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1} ▶️</span>
        </button>
    `;
  }

  // Page 1 and NO other pages
  return `
  <a href="#dogs" class="pagination__btn--up" title="go up" role="button">🔼</a>
  `;
}

export function showPaginationMarkup(filteredData, goToPage) {
  const markup = getPaginationMarkup(filteredData, goToPage);

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

// get information on what is a current page on dogs list
export function getSearchResultsPage(filteredData, page = model.state.page) {
  const start = (page - 1) * model.state.resultsPerPage;
  const end = page * model.state.resultsPerPage;
  return filteredData.slice(start, end);
}
