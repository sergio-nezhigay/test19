import { elements } from './elements';
import { buttonsMarkup, selectMarkup } from './markup';
import { makeRequestAndMarkup } from './newsAPI';

const MIN_LARGE_SCREEN_WIDTH = 1280;
const MIN_MEDIUM_SCREEN_WIDTH = 768;
const LARGE_SCREEN_BUTTON_QUANTITY = 6;
const MEDIUM_SCREEN_BUTTON_QUANTITY = 4;
const DEFAULT_BUTTON_QUANTITY = 0;

export function makeCategoryButtonsAndSelect(categories) {
  const categoriesButtonQty = categoryButtonsQuantity();
  elements.categories.insertAdjacentHTML(
    'beforeend',
    buttonsMarkup(categories.slice(0, categoriesButtonQty))
  );
  elements.categories.insertAdjacentHTML(
    'beforeend',
    selectMarkup(categories.slice(categoriesButtonQty))
  );
  initSelect();
  elements.categories.addEventListener('click', onCategoriesClick);
}

async function onCategoriesClick(e) {
  console.log(e.target);
  const category = e.target.dataset?.category;
  if (!category) return;
  await makeRequestAndMarkup(category);
}

function categoryButtonsQuantity() {
  if (window.matchMedia(`(min-width: ${MIN_LARGE_SCREEN_WIDTH}px)`).matches) {
    return LARGE_SCREEN_BUTTON_QUANTITY;
  } else if (
    window.matchMedia(`(min-width: ${MIN_MEDIUM_SCREEN_WIDTH}px)`).matches
  ) {
    return MEDIUM_SCREEN_BUTTON_QUANTITY;
  } else {
    return DEFAULT_BUTTON_QUANTITY;
  }
}

function initSelect() {
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
