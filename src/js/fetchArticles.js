import axios from 'axios';

const BASE_URL = 'https://api.nytimes.com/svc';
const API_KEY = 'uGHJWsajhmnJg2AMcnCD9YXkamMpVOHo';

export const fetchPopularArticles = async pageNumber => {
  try {
    const response = await axios.get(
      `${BASE_URL}/mostpopular/v2/viewed/1.json?`,
      {
        params: {
          'api-key': API_KEY,
          page: pageNumber,
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchQueryArticles = async (PAGE_VALUE, searchTerm) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/v2/articlesearch.json`,
      {
        params: {
          'api-key': API_KEY,
          page: PAGE_VALUE,
          q: searchTerm,
          sort: 'relevance',
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchQuery = async ({ word, pageNumber }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/v2/articlesearch.json`,
      {
        params: {
          'api-key': API_KEY,
          q: word,
          page: pageNumber - 1,
          sort: 'relevance',
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategory = async ({ category, pageNumber, limit }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/news/v3/content/all/${category}.json`,
      {
        params: {
          'api-key': API_KEY,
          limit: limit,
          offset: pageNumber - 1,
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/news/v3/content/section-list.json`,
      {
        params: {
          'api-key': API_KEY,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPopular = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/mostpopular/v2/viewed/1.json?`,
      {
        params: {
          'api-key': API_KEY,
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
