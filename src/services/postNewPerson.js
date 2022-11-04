import { setNewPerson } from '../redux/actions/person';

export const postNewPerson = (data) => (dispatch) => {
  const user = JSON.stringify({
    user: {
      username: data.username,
      email: data.email,
      password: data.password,
    },
  });
  const res = fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: user,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Response('', { status: response.status, statusText: 'Not found' });
      }
      return response.json();
    })
    .then((json) => {
      console.log(json);
      dispatch(setNewPerson(json));
      return 'ok';
    });
  return res;
};
