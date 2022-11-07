export const updateUser = (data) => {
  const token = localStorage.getItem('token');
  const user = JSON.stringify({
    user: {
      email: data.email,
      password: data.password,
      username: data.username,
      image: data.image,
    },
  });

  fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: user,
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
    });
};
