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

export function articlesMarkup(articles, insertBlock) {
  const markup = articles
    .map(
      (
        { abstract, date = '', imageUrl, title, url, section, favorite },
        index
      ) => {
        const buttonText = favorite
          ? 'Remove from Favorites'
          : 'Add to Favorite';
        const testObjectForButton = {
          abstract,
          imageUrl,
          title,
          url,
          section,
          favorite,
        };
        const stringForButton = JSON.stringify(testObjectForButton);
        let articleMarkup = '';
        if (index === insertBlock) {
          articleMarkup +=
            '<li class="articles__item special"><p>This is a special item</p></li>';
        }
        articleMarkup += `
        <li class="articles__item">
          <div class="articles__image-wrapper">
            <img src="${imageUrl}" class="articles__image" />
            <p class="articles__category">${section}</p>
            <button class="articles__button" data-id="${url}" data-favorite="${favorite}" data-info="${stringForButton}">${buttonText}</button>
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
        return articleMarkup;
      }
    )
    .join('');
  return markup;
}

// export function articlesMarkup(articles) {
//   const markup = articles
//     .map(({ abstract, date = '', imageUrl, title, url, section, favorite }) => {
//       const buttonText = favorite ? 'Remove from Favorites' : 'Add to Favorite';
//       const testObjectForButton = {
//         abstract,
//         imageUrl,
//         title,
//         url,
//         section,
//         favorite,
//       };
//       const stringForButton = JSON.stringify(testObjectForButton);
//       return `
//     <li class="articles__item">
//       <div class="articles__image-wrapper">
//         <img src="${imageUrl}" class="articles__image" />
//         <p class="articles__category">${section}</p>
//         <button class="articles__button" data-id="${url}" data-favorite="${favorite}" data-info="${stringForButton}">${buttonText}</button>
//       </div>
//       <div class="articles__details">
//         <h2 class="articles__title">
//           ${title}
//         </h2>
//         <p class="articles__abstract">
//           ${abstract}
//         </p>
//         <div class="articles__row">
//           <p class="articles__date">${date.split(' ')[0]}</p>

//           <a href="${url}" class="articles__link">Read more</a>
//         </div>
//       </div>
//     </li>
//   `;
//     })
//     .join('');
//   return markup;
// }

export function dropdownMarkup(categories) {
  const markup = categories
    .map(({ display_name, section }) => {
      return `
      <li class="dropdown__select-option" data-category="${section}" role="option">${display_name}</li>
  `;
    })
    .join('');
  return `<div class="dropdown">
    <input type="checkbox" class="dropdown__switch" id="filter-switch" hidden />
    <label for="filter-switch" class="dropdown__options-filter">
      <ul class="dropdown__filter" role="listbox" tabindex="-1">
        <li class="dropdown__filter-selected" aria-selected="true">Others</li>
        <li>
          <ul class="dropdown__select">
            ${markup}
          </ul>
        </li>
      </ul>
    </label>
  </div>`;
}
