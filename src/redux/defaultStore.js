import avatar from '../AuthorizedHeader/avatar.png';

const checkLocal = localStorage.getItem('isAuthorized');
console.log(localStorage.getItem('isAuthorized'));

export const defaultStore = {
  person: {
    newPerson: {},
    error: false,
  },

  personLogIn: {
    isAuthorized: checkLocal,
    username: localStorage.getItem('username') ? localStorage.getItem('username') : null,
    email: localStorage.getItem('email') ? localStorage.getItem('email') : null,
    avatar: localStorage.getItem('avatar') ? localStorage.getItem('avatar') : avatar,
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
