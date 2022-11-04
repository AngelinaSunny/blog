import {
  setError,
  setIsAuthorized,
  setNewPassword,
  setNewEmail,
  setNewUsername,
  setToken,
} from '../redux/actions/personLogIn';

export const fetchLogIn = (data) => (dispatch) => {
  const user = JSON.stringify({
    user: {
      email: data.email,
      password: data.password,
    },
  });
  const res = fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: user,
  })
    .then((response) => {
      if (!response.ok) {
        dispatch(setError(response.statusText));
        throw new Response('', { status: response.status, statusText: 'Not found' });
      } else {
        return response.json();
      }
    })
    .then((json) => {
      console.log(json);
      dispatch(setNewEmail(json.user.email));
      dispatch(setNewUsername(json.user.username));
      dispatch(setToken(json.user.token));
      dispatch(setNewPassword(data.password));
      dispatch(setIsAuthorized());
      localStorage.setItem('username', json.user.username);
      localStorage.setItem('email', json.user.email);
      localStorage.setItem('isAuthorized', true);
      return 'ok';
    });
  return res;
};
