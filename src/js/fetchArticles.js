import axios from 'axios';

const BASE_URL = 'https://api.nytimes.com/svc';
const API_KEY = 'shLcRksRAhdUD0ieGQyvYj4xaGnwKCJl';

export const fetchQuery = async (word, pageNumber) => {
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
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    throw error; // re-throw the error so that the caller can handle it
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
