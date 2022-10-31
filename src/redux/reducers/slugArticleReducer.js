import { defaultStore } from '../defaultStore';

export const slugArticleReducer = (store = defaultStore.article, action) => {
  switch (action.type) {
    case 'FETCH_SLUG_ARTICLE':
      return {
        ...store,
        slugArticle: action.payload,
      };
    case 'FETCH_SLUG_IS_LOADING':
      return {
        ...store,
        slugIsLoading: true,
      };
    case 'FETCH_ERROR_SLUG':
      return {
        ...store,
        errorSlug: true,
      };
    case 'SET_SLUG_ARTICLE':
      return {
        ...store,
        slug: action.payload,
      };
    default:
      return store;
  }
};
