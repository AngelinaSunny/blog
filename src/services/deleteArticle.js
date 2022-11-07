export const deleteArticle = async (slug) => {
  const token = localStorage.getItem('token');
  const result = await fetch(`https://blog.kata.academy/api${slug}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  if (result.ok) {
    return 'ok';
  }
};
