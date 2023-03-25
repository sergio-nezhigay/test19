import { addToStorage, getFromStorage, removeFromStorage } from './storage';

export function addFavoriteField(articles) {
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

export function handleFavoriteClick(e) {
  if (!e.target.dataset?.favorite) return;

  if (e.target.innerText.includes('Remove from Favorites')) {
    removeFromStorage(e.target.dataset.id);
    e.target.innerText = 'Add to Favorite';
  } else {
    addToStorage(e.target.dataset.id);
    e.target.innerText = 'Remove from Favorites';
  }
}
