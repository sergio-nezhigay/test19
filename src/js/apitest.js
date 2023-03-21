const catName = 'automobiles';

import { NytimesAPI } from './nytimesAPI';
import { elements } from './elements';
import { cardsMarkup } from './markup';

export async function apitest() {
  const nytimesAPI = new NytimesAPI();
  let { results } = await nytimesAPI.fetchCategories();
  console.log('🚀 ~ file: apitest.js:22 ~ fetch1 ~ results:', results);
  const results2 = await nytimesAPI.fetchNewsListFromCategorie(catName);
  console.log('🚀 ~ file: apitest.js:13 ~ apitest ~ results2:', results2);
  let response = await nytimesAPI.searchNews('trump');
  console.log('🚀 ~ file: apitest.js:13 ~ apitest ~ response:', response);
  let popular = await nytimesAPI.popularNews();
  console.log('🚀 ~ file: apitest.js:13 ~ apitest ~ popular:', popular);
  const markup = cardsMarkup(popular);
  elements.cards.insertAdjacentHTML('beforeend', markup);
}
