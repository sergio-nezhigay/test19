import { NytimesAPI } from './nytimesAPI';
import { elements } from './elements';
import { buttonsMarkup, dropdownMarkup, articlesMarkup } from './markup';
import { pagination, refreshPaginationData } from './pagination';

const MIN_LARGE_SCREEN_WIDTH = 1280;
const MIN_MEDIUM_SCREEN_WIDTH = 768;

const nytimesAPI = new NytimesAPI();

let categoriesButtonQty = 0;

init();

async function init() {
  processScreenSize();
  let results = await nytimesAPI.categoriesList();
  makeCategoryButtonsAndDropdown(results);
  await makeRequestFillHtmlRefreshValuePage(1);
  pagination();
}

export async function makeRequestFillHtmlRefreshValuePage(pageNumber) {
  let news = await nytimesAPI.getNextDataFromServer(pageNumber);
  elements.articles.innerHTML = articlesMarkup(news);
  refreshPaginationData({
    curPage: pageNumber,
    numLinksTwoSide: 1,
    totalPages: calculatePages(nytimesAPI.numResults, nytimesAPI.limit),
  });
}

function calculatePages(totalNews, newsPerPage) {
  return Math.ceil((totalNews + 1) / newsPerPage); // 1 - for weather!
}

export function makeCategoryButtonsAndDropdown(categories) {
  elements.categories.insertAdjacentHTML(
    'beforeend',
    buttonsMarkup(categories.slice(0, categoriesButtonQty))
  );
  elements.categories.insertAdjacentHTML(
    'beforeend',
    dropdownMarkup(categories.slice(categoriesButtonQty))
  );
  initDropdown();
  elements.categories.addEventListener('click', onCategoriesClick);
}

async function onCategoriesClick(e) {
  const category = e.target.dataset?.category;
  if (!category) return;
  nytimesAPI.category = category;
  if (e.target.nodeName === 'BUTTON') {
    document.querySelector('.dropdown__filter-selected').textContent = 'Other';
  }
  await makeRequestFillHtmlRefreshValuePage(1);
  pagination();
}

function processScreenSize() {
  if (window.matchMedia(`(min-width: ${MIN_LARGE_SCREEN_WIDTH}px)`).matches) {
    nytimesAPI.limit = 9;
    categoriesButtonQty = 6;
  } else if (
    window.matchMedia(`(min-width: ${MIN_MEDIUM_SCREEN_WIDTH}px)`).matches
  ) {
    nytimesAPI.limit = 8;
    categoriesButtonQty = 4;
  } else {
    nytimesAPI.limit = 5;
    categoriesButtonQty = 0;
  }
}

function initDropdown() {
  // Change option selected
  const label = document.querySelector('.dropdown__filter-selected');
  const options = Array.from(
    document.querySelectorAll('.dropdown__select-option')
  );

  options.forEach(option => {
    option.addEventListener('click', () => {
      label.textContent = option.textContent;
    });
  });

  // Close dropdown onclick outside
  document.addEventListener('click', e => {
    const toggle = document.querySelector('.dropdown__switch');
    const element = e.target;

    if (element == toggle) return;
    const isDropdownChild = element.closest('.dropdown__filter');
    if (!isDropdownChild) {
      toggle.checked = false;
    }
  });
}
