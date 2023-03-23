import { elements } from './elements';
import { buttonsMarkup, selectMarkup } from './markup';

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
