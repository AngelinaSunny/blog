export const fetchSlugArticle = (slug) => ({ type: 'FETCH_SLUG_ARTICLE', payload: slug });
export const fetchSlugIsLoading = () => ({ type: 'FETCH_SLUG_IS_LOADING' });
export const fetchErrorSlug = () => ({ type: 'FETCH_ERROR_SLUG' });
export const setSlugArticle = (slug) => ({ type: 'SET_SLUG_ARTICLE', payload: slug });
