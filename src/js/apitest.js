import { NytimesAPI } from './nytimesAPI';
import { elements } from './elements';
import { articlesMarkup } from './markup';
import { addToStorage, getFromStorage, removeFromStorage } from './storage';

const nytimesAPI = new NytimesAPI();

export async function apitest() {
  elements.articles.addEventListener('click', onCardClick);
  elements.categories.addEventListener('click', onCategoriesClick);
  elements.categories.addEventListener('change', onCategoriesSelect);
  let popular = await nytimesAPI.popularNews();
  popular = addFavoriteField(popular);
  console.log('🚀 Popular News', popular);
  const markup = articlesMarkup(popular);
  elements.articles.insertAdjacentHTML('beforeend', markup);

  let { results } = await nytimesAPI.fetchCategories();
  makeCategoryButtonsAndSelect(results);
  // let newsFromWordSearch = await nytimesAPI.searchNews('trump');
  // console.log('🚀All news from search by word:', newsFromWordSearch);
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
  if (!e.target.dataset?.favorite) return;

  if (e.target.innerText.includes('Remove from Favorites')) {
    removeFromStorage(e.target.dataset.id);
    e.target.innerText = 'Add to Favorite';
  } else {
    addToStorage(e.target.dataset.id);
    e.target.innerText = 'Remove from Favorites';
  }
}

async function onCategoriesClick(e) {
  const category = e.target.dataset?.category;
  if (!category) return;
  const newsCatagory = await nytimesAPI.fetchNewsListFromCategorie(category);
  const markup = articlesMarkup(newsCatagory);
  elements.articles.innerHTML = markup;
}

async function onCategoriesSelect(e) {
  console.dir(e.target.value);
  const newsCatagory = await nytimesAPI.fetchNewsListFromCategorie(
    e.target.value
  );
}

function makeCategoryButtonsAndSelect(categories) {
  const categoriesButtonQty = categoryButtonsQuantity();
  makeButtons(categories.slice(0, categoriesButtonQty));
  makeSelect(categories.slice(categoriesButtonQty));
  return;
}

function makeButton(category) {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.innerHTML = category.display_name;
  btn.dataset.category = category.section;
  btn.classList.add('categories__button');
  li.appendChild(btn);
  return li;
}

function makeButtons(categories) {
  const ul = document.createElement('ul');
  ul.classList.add('categories__list');
  categories.forEach(category => {
    const li = makeButton(category);
    ul.appendChild(li);
  });
  elements.categories.appendChild(ul);
}

function categoryButtonsQuantity() {
  if (window.matchMedia('(min-width: 1280px)').matches) {
    return 6;
  } else {
    if (window.matchMedia('(min-width: 768px)').matches) {
      return 4;
    }
  }
  return 0;
}

function makeSelect(categories) {
  const select = document.createElement('select');
  select.classList.add('categories__select');
  categories.forEach(category => {
    const option = makeOption(category);
    select.appendChild(option);
  });
  elements.categories.appendChild(select);
}

function makeOption(category) {
  const option = document.createElement('option');
  option.innerText = category.display_name;
  option.value = category.section;
  return option;
}

apitest();
