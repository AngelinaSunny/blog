import {
  setError,
  setIsAuthorized,
  setNewEmail,
  setNewUsername,
  setToken,
  setNewImg,
} from '../redux/actions/personLogIn';

export const getAuthorizedUser = () => (dispatch) => {
  const token = localStorage.getItem('token');

  if (token) {
    fetch('https://blog.kata.academy/api/user', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          dispatch(setError(res.statusText));
          throw new Error(res.status, res.statusText);
        } else {
          return res.json();
        }
      })
      .then((json) => {
        if (json.user.image) {
          dispatch(setNewImg(json.user.image));
        }
        dispatch(setNewEmail(json.user.email));
        dispatch(setNewUsername(json.user.username));
        dispatch(setToken(json.user.token));
        localStorage.setItem('token', json.user.token);
        dispatch(setIsAuthorized());
      })
      .catch((e) => console.log(e));
  }
};
