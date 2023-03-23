import axios from 'axios';

const API_KEY = 'shLcRksRAhdUD0ieGQyvYj4xaGnwKCJl';
const BASE_URL = 'https://api.nytimes.com/svc';
const NY_URL = 'https://www.nytimes.com/';
const CATEGORIES_SUFFIX = '/news/v3/content/section-list.json';
const POPULAR_SUFFIX = '/mostpopular/v2/viewed/30.json';
const NEWS_CATEGORIES_SUFFIX = '/news/v3/content/inyt/';
const SEARCH_SUFFIX = '/search/v2/articlesearch.json';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    'api-key': API_KEY,
  },
});

class NytimesAPI {
  constructor() {
    // this._currentList = [];
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

  async fetchCategories() {
    return this.fetchAPI(CATEGORIES_SUFFIX);
  }

  async popularNews() {
    const params = {};
    const { results } = await this.fetchAPI(POPULAR_SUFFIX, params);
    let imageUrl;
    return results.map(article => {
      if (article.media.length > 0)
        imageUrl = this.selectByFormat(article.media[0]['media-metadata']);

      return {
        title: article.title,
        date: article.updated,
        abstract: article.abstract,
        url: article.url,
        section: article.section,
        imageUrl,
      };
    });
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

  async fetchNewsListFromCategorie(categorie) {
    try {
      const { results } = await this.fetchAPI(
        NEWS_CATEGORIES_SUFFIX + encodeURIComponent(categorie) + '.json'
      );
      return results.map(article => ({
        title: article.title,
        date: article.published_date,
        abstract: article.abstract,
        section: article.section,
        url: article.url,
        imageUrl: this.selectByFormat(article.multimedia),
      }));
    } catch (error) {
      console.error(`Error fetching news list from category: ${error.message}`);
      return [];
    }
  }

  async searchNews(term) {
    const params = { q: term, offset: 3, limit: 20 };
    const {
      response: { docs },
    } = await this.fetchAPI(SEARCH_SUFFIX, params);

    return docs.map(article => {
      const imageXlarge = article.multimedia.find(
        media => media.subtype === 'xlarge'
      );
      const imageUrl = imageXlarge ? NY_URL + imageXlarge.url : null;
      return {
        title: article.headline.main,
        date: article.pub_date,
        abstract: article.abstract,
        url: article.url,
        imageUrl,
      };
    });
  }
}

export { NytimesAPI };
