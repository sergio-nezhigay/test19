import { NytimesAPI } from './nytimesAPI';
import { elements } from './elements';
import { addFavoriteField, handleFavoriteClick } from './favorites';
import { articlesMarkup } from './markup';

const nytimesAPI = new NytimesAPI();
elements.articles.addEventListener('click', handleFavoriteClick);

export async function init() {
  let popular = await nytimesAPI.popularNews();
  popular = addFavoriteField(popular);
  const markup = articlesMarkup(popular);
  elements.articles.insertAdjacentHTML('beforeend', markup);
}

export async function makeRequestAndMarkup(term) {
  const newsCatagory = await nytimesAPI.fetchNewsListFromCategorie(term);
  elements.articles.innerHTML = articlesMarkup(newsCatagory);
}
