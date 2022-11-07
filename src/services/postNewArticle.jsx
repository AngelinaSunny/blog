export const postNewArticle = (data) => {
  const tags = [];
  data.tagList.forEach((el) => {
    tags.push(el.tag);
  });
  const token = localStorage.getItem('token');
  const article = JSON.stringify({
    article: {
      title: data.title,
      description: data.description,
      body: data.text,
      tagList: tags,
    },
  });

  const res = fetch('https://blog.kata.academy/api/articles', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: article,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Response('', { status: response.status, statusText: 'Not found' });
      }
      return response.json();
    })
    .then((json) => {
      console.log(json);
      return 'ok';
    });
  return res;
};
