export function cardsMarkup(articles) {
  const markup = articles
    .slice(0, 7)
    .map(({ abstract, date, imageUrl, title, url, section, favorite }) => {
      const buttonText = favorite ? 'Remove from Favorites' : 'Add to Favorite';
      return `<ul>
    <li class="cards__item">
      <div class="cards__image-wrapper">
        <img src="${imageUrl}" class="cards__image" />
        <p class="cards__category">${section}</p>
        <button class="cards__button" data-id="${url}" data-favorite="${favorite}">${buttonText}</button>
      </div>
      <div class="cards__details">
        <h2 class="cards__title">
          ${title}
        </h2>
        <p class="cards__abstract">
          ${abstract}
        </p>
        <div class="cards__row">
          <p class="cards__date">${date.split(' ')[0]}</p>
          <a href="${url}" class="cards__link">Read more</a>
        </div>
      </div>
    </li>
  </ul>`;
    })
    .join('');
  return markup;
}
