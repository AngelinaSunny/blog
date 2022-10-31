import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';

import { Layout } from '../Layout/Layout';
import { SlugArticle } from '../SlugArticle/SlugArticle';
import { ListArticles } from '../ListArticles/ListArticles';
import { getArticles } from '../services/getArticles';

export const App = () => {
  const dispatch = useDispatch();
  const { offset } = useSelector((store) => store.articles);

  useEffect(() => {
    dispatch(getArticles(offset));
  }, [offset]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ListArticles />} />
        <Route path="articles" element={<ListArticles />} />
        <Route path="articles/:slug" element={<SlugArticle />} />
        <Route path="*" element={<Layout />} />
      </Route>
    </Routes>
  );
};
