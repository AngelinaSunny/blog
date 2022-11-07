import { setNewImg } from '../redux/actions/personLogIn';

export const updateUser = (data) => (dispatch) => {
  const token = localStorage.getItem('token');
  const user = JSON.stringify({
    user: {
      email: data.email,
      password: data.password,
      username: data.username,
      image: data.image,
    },
  });
  console.log('user: ', user);

  fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: user,
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      dispatch(setNewImg(data.image));
    });
};
