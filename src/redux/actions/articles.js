export const fetchError = () => ({ type: 'FETCH_ERROR' });
export const fetchArticles = (res) => ({ type: 'FETCH_ARTICLES', payload: res });
export const fetchOffset = (res) => ({ type: 'FETCH_OFFSET', payload: res });
export const fetchIsLoading = () => ({ type: 'FETCH_IS_LOADING' });
