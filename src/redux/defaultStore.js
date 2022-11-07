import avatar from '../AuthorizedHeader/avatar.png';

export const defaultStore = {
  person: {
    newPerson: {},
    error: false,
  },

  personLogIn: {
    isAuthorized: false,
    username: null,
    email: null,
    avatar,
    error: false,
  },

  articles: {
    articlesList: [],
    articlesCount: 0,
    error: false,
    isLoading: false,
    offset: 0,
  },
};
