const token = localStorage.getItem('token');

export const fetchFavorite = (slug, met) => {
  fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: met,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: '',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Response('', { status: response.status, statusText: 'Not found' });
      }
      return response.json();
    })
    .then((json) => {
      console.log(json);
    });
};
