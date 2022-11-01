import { fetchArticles, fetchError, fetchIsLoading } from '../redux/actions/articles';

export const getArticles =
  (page = 0) =>
  (dispatch) =>
    fetch(`https://blog.kata.academy/api/articles?offset=${page}`)
      .then((res) => {
        if (!res.ok) {
          dispatch(fetchError());
          throw new Response('', { status: res.status, statusText: 'Not found' });
        }
        return res.json();
      })
      .then((json) => {
        dispatch(fetchArticles(json));
        dispatch(fetchIsLoading());
      })
      .catch((e) => {
        throw new Response('', { status: e.status, statusText: 'Not found' });
      });
