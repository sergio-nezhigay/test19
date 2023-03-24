import { NytimesAPI } from './nytimesAPI';
import { elements } from './elements';
import { addFavoriteField, handleFavoriteClick } from './favorites';
import { makeCategoryButtonsAndDropdown } from './categoryFilter';
import { articlesMarkup } from './markup';

const nytimesAPI = new NytimesAPI();
elements.articles.addEventListener('click', handleFavoriteClick);

async function init() {
  let popular = await nytimesAPI.popularNews();
  popular = addFavoriteField(popular);
  const markup = articlesMarkup(popular);
  elements.articles.insertAdjacentHTML('beforeend', markup);
  let { results } = await nytimesAPI.fetchCategories();
  makeCategoryButtonsAndDropdown(results);
}

init();
