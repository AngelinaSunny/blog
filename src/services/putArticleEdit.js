export const putArticleEdit = (data, pathname) => {
  console.log(data, pathname);
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

  const result = fetch(`https://blog.kata.academy/api/articles/${pathname}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: article,
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return 'ok';
    });
  return result;
};
