import { defaultStore } from '../defaultStore';

export const articlesReducer = (store = defaultStore.articles, action) => {
  switch (action.type) {
    case 'FETCH_ERROR':
      return {
        ...store,
        error: true,
      };
    case 'FETCH_ARTICLES':
      return {
        ...store,
        articlesList: action.payload.articles,
        articlesCount: action.payload.articlesCount,
      };
    case 'FETCH_OFFSET':
      return {
        ...store,
        offset: action.payload,
      };
    case 'FETCH_IS_LOADING':
      return {
        ...store,
        isLoading: true,
      };
    default:
      return store;
  }
};
