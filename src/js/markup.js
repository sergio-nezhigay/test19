export function articlesMarkup(articles) {
  const markup = articles
    .slice(0, 7)
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
