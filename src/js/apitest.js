import { NytimesAPI } from './nytimesAPI';
import { elements } from './elements';
import { cardsMarkup } from './markup';
import { addToStorage, getFromStorage, removeFromStorage } from './storage';

export async function apitest() {
  const nytimesAPI = new NytimesAPI();
  elements.cards.addEventListener('click', onCardClick);
  let popular = await nytimesAPI.popularNews();
  popular = addFavoriteField(popular);
  console.log('🚀 Popular News', popular);
  const markup = cardsMarkup(popular);
  elements.cards.insertAdjacentHTML('beforeend', markup);
  // Other news search api tests
  let { results } = await nytimesAPI.fetchCategories();
  console.log('🚀 Categorie names list:', results);
  const newsFromSingleCatagorie = await nytimesAPI.fetchNewsListFromCategorie(
    'automobiles'
  );
  console.log('🚀 All news from single catagorie:', newsFromSingleCatagorie);
  let newsFromWordSearch = await nytimesAPI.searchNews('trump');
  console.log('🚀All news from search by word:', newsFromWordSearch);
}

function addFavoriteField(articles) {
  const favoriteIds = getFromStorage();
  return articles.map(article => {
    if (favoriteIds.includes(article.url)) {
      return {
        ...article,
        favorite: true,
      };
    } else {
      return {
        ...article,
        favorite: false,
      };
    }
  });
}

function onCardClick(e) {
  if (!e.target.dataset) return;
  if (e.target.dataset.favorite.includes('true')) {
    removeFromStorage(e.target.dataset.id);
    e.target.innerText = 'Add to Favorite';
  } else {
    addToStorage(e.target.dataset.id);
    e.target.innerText = 'Remove from Favorites';
  }
}

apitest();
