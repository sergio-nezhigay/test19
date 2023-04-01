import {
  fetchQuery,
  fetchPopular,
  fetchCategory,
  fetchCategories,
} from './fetchArticles';

const NY_URL = 'https://www.nytimes.com/';

class NytimesAPI {
  constructor() {
    this.reset();
    this._limit = 0;
  }

  reset() {
    this._category = null;
    this._word = null;
    this._popular = null;
    this._num_results = 0;
  }

  async getNextDataFromServer(pageNumber) {
    if (this._category) {
      return await this.fetchNewsListFromCategorie(pageNumber);
    } else if (this._word) {
      return searchNews(this._currentWord, pageNumber);
    } else return await this.popularNews(pageNumber);
  }

  async fetchAPI(suffix, params = {}) {
    try {
      const res = await axiosInstance.get(suffix, {
        params,
      });
      return res.data;
    } catch (error) {
      throw new Error(`API Error in fetch: ${error.message}`);
    }
  }

  async categoriesList() {
    const { data } = await fetchCategories();
    return data.results;
  }

  async popularNews(pageNumber = 1) {
    const newsPerPage = pageNumber === 1 ? this._limit - 1 : this._limit;
    if (!this._popular) {
      let imageUrl = '';
      const { data } = await fetchPopular();

      const { results, num_results } = data;
      this._num_results = num_results;
      this._popular = results.map(article => {
        if (article.media.length > 0)
          imageUrl = this.selectByFormat(article.media[0]['media-metadata']);

        return {
          title: article.title,
          date: article.published_date,
          abstract: article.abstract,
          url: article.url,
          section: article.section,
          imageUrl,
        };
      });
    }
    const startIndex = (pageNumber - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;
    return this._popular.slice(startIndex, endIndex);
  }

  selectByFormat(metadataArray) {
    if (!metadataArray) {
      return null;
    }
    const image = metadataArray.find(
      media => media.format === 'mediumThreeByTwo440'
    );
    return image ? image.url : null;
  }

  async fetchNewsListFromCategorie(pageNumber) {
    const newsPerPage = pageNumber === 1 ? this._limit - 1 : this._limit;
    try {
      const { data } = await fetchCategory({
        category: this._category,
        pageNumber,
        limit: newsPerPage,
      });
      const { results, num_results } = data;
      this._num_results = num_results;
      return results.map(article => {
        return {
          title: article.title,
          date: article.published_date,
          abstract: article.abstract,
          section: article.section,
          url: article.url,
          imageUrl: this.selectByFormat(article.multimedia),
        };
      });
    } catch (error) {
      console.error(`Error fetching news list from category: ${error.message}`);
      return [];
    }
  }

  async searchNews({ word, pageNumber, limit }) {
    if (pageNumber === 1) limit--;
    const { data } = await fetchQuery({ word, pageNumber });
    const { docs, meta } = data.response;
    this._num_results = meta.hits;
    this._word = word;
    const result = docs.map(article => {
      const imageXlarge = article.multimedia.find(
        media => media.subtype === 'xlarge'
      );
      const imageUrl = imageXlarge ? NY_URL + imageXlarge.url : null;
      return {
        title: article.headline.main,
        date: article.pub_date,
        abstract: article.abstract,
        url: article.url,
        section: article.section_name,
        imageUrl,
      };
    });
    return result.slice(0, limit);
  }

  set limit(newLimit) {
    this._limit = newLimit;
  }

  set category(newCategory) {
    this._category = newCategory;
  }

  get limit() {
    return this._limit;
  }

  get numResults() {
    return this._num_results;
  }
}

export { NytimesAPI };
