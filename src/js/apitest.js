import { NytimesAPI } from './nytimesAPI';
import { elements } from './elements';
import { addFavoriteField, handleFavoriteClick } from './favorites';
import { makeCategoryButtonsAndSelect } from './categories';
import { articlesMarkup } from './markup';

const nytimesAPI = new NytimesAPI();

export async function apitest() {
  elements.articles.addEventListener('click', handleFavoriteClick);
  elements.categories.addEventListener('click', onCategoriesClick);
  elements.categories.addEventListener('change', onCategoriesSelect);

  let popular = await nytimesAPI.popularNews();
  popular = addFavoriteField(popular);
  const markup = articlesMarkup(popular);
  elements.articles.insertAdjacentHTML('beforeend', markup);

  let { results } = await nytimesAPI.fetchCategories();
  makeCategoryButtonsAndSelect(results);
}

async function onCategoriesClick(e) {
  const category = e.target.dataset?.category;
  if (!category) return;
  await makeRequestAndMarkup(category);
}

async function onCategoriesSelect(e) {
  await makeRequestAndMarkup(e.target.value);
}

async function makeRequestAndMarkup(term) {
  const newsCatagory = await nytimesAPI.fetchNewsListFromCategorie(term);
  const markup = articlesMarkup(newsCatagory);
  elements.articles.innerHTML = markup;
}

apitest();
