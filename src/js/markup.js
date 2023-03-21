export function cardsMarkup(articles) {
  const markup = articles
    .slice(0, 7)
    .map(
      ({ abstract, date, imageUrl, title }) => `<ul>
    <li class="cards__item">
      <div class="cards__image-wrapper">
        <img src="${imageUrl}" class="cards__image" />
        <p class="cards__category">Job searching</p>
        <button class="cards__button">Add to Favorite</button>
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
          <a href="#" class="cards__link">Read more</a>
        </div>
      </div>
    </li>
  </ul>`
    )
    .join('');
  console.log('🚀 ~ file: markup.js:28 ~ cardsMarkup ~ markup:', markup);
  return markup;
}
