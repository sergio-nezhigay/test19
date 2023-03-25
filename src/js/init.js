import { NytimesAPI } from './nytimesAPI';
import { elements } from './elements';
import { handleFavoriteClick } from './favorites';
import { articlesMarkup } from './markup';
import { buttonsMarkup, dropdownMarkup } from './markup';
import { addFavoriteField } from './favorites';

const MIN_LARGE_SCREEN_WIDTH = 1280;
const MIN_MEDIUM_SCREEN_WIDTH = 768;

const nytimesAPI = new NytimesAPI();
let limit = 0;
let categoriesButtonQty = 0;

elements.articles.addEventListener('click', handleFavoriteClick);
init();

async function init() {
  processScreenSize();
  const pageNumber = 1;
  const word = 'trump';
  let keySearchResults = await nytimesAPI.searchNews({
    word,
    pageNumber,
    limit,
  });
  keySearchResults = addFavoriteField(keySearchResults);
  const markup = articlesMarkup(keySearchResults);

  // let popular = await nytimesAPI.popularNews({ pageNumber, limit });
  // popular = addFavoriteField(popular);
  // const markup = articlesMarkup(popular);

  elements.articles.insertAdjacentHTML('beforeend', markup);

  let results = await nytimesAPI.categoriesList();

  makeCategoryButtonsAndDropdown(results);
}

async function makeCatagoryRequestAndMarkup(category) {
  const pageNumber = 1;
  const newsCatagory = await nytimesAPI.fetchNewsListFromCategorie({
    category,
    pageNumber,
    limit,
  });
  elements.articles.innerHTML = articlesMarkup(newsCatagory);
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
  if (e.target.nodeName === 'BUTTON') {
    document.querySelector('.dropdown__filter-selected').textContent = 'Other';
  }
  await makeCatagoryRequestAndMarkup(category);
}

function processScreenSize() {
  if (window.matchMedia(`(min-width: ${MIN_LARGE_SCREEN_WIDTH}px)`).matches) {
    limit = 9;
    categoriesButtonQty = 6;
  } else if (
    window.matchMedia(`(min-width: ${MIN_MEDIUM_SCREEN_WIDTH}px)`).matches
  ) {
    limit = 8;
    categoriesButtonQty = 4;
  } else {
    limit = 5;
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
