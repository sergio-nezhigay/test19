export function buttonsMarkup(categories) {
  const markup = categories
    .map(({ display_name, section }) => {
      return `
      <li><button data-category="${section}" class="categories__button">${display_name}</button></li>
  `;
    })
    .join('');
  return `<ul class="categories__list">${markup}</ul>`;
}

export function selectMarkup(categories) {
  const markup = categories
    .map(({ display_name, section }) => {
      return `
      <option value="${section}">${display_name}</option>
  `;
    })
    .join('');
  return `<select class="categories__select">${markup}</select>`;
}

export function articlesMarkup(articles) {
  const markup = articles
    .slice(0, 8)
    .map(({ abstract, date = '', imageUrl, title, url, section, favorite }) => {
      const buttonText = favorite ? 'Remove from Favorites' : 'Add to Favorite';
      return `
    <li class="articles__item">
      <div class="articles__image-wrapper">
        <img src="${imageUrl}" class="articles__image" />
        <p class="articles__category">${section}</p>
        <button class="articles__button" data-id="${url}" data-favorite="${favorite}">${buttonText}</button>
      </div>
      <div class="articles__details">
        <h2 class="articles__title">
          ${title}
        </h2>
        <p class="articles__abstract">
          ${abstract}
        </p>
        <div class="articles__row">
          <p class="articles__date">${date.split(' ')[0]}</p>

          <a href="${url}" class="articles__link">Read more</a>
        </div>
      </div>
    </li>
  `;
    })
    .join('');
  return `<ul class="articles">${markup}</ul>`;
}
