import { fetchSlugArticle, fetchSlugIsLoading, fetchErrorSlug } from '../redux/actions/slugArticle';

export const getSlugArticle = (slug) => (dispatch) =>
  fetch(`https://blog.kata.academy/api/articles/${slug}`)
    .then((res) => {
      if (!res.ok) {
        dispatch(fetchErrorSlug());
        throw Error('Ошибка запроса статьи');
      }
      return res.json();
    })
    .then((json) => {
      dispatch(fetchSlugArticle(json));
      dispatch(fetchSlugIsLoading());
    })
    .catch((e) => console.log(e.message));
