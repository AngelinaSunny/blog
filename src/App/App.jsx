import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { Layout } from '../Layout/Layout';
import { SlugArticle, getSlugArticle } from '../SlugArticle/SlugArticle';
import { ListArticles } from '../ListArticles/ListArticles';
import { ErrorPage } from '../ErrorPage/ErrorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<ListArticles />} />
      <Route path="articles" element={<ListArticles />} errorElement={<ErrorPage />} />
      <Route path="articles/:slug" element={<SlugArticle />} loader={getSlugArticle} errorElement={<ErrorPage />} />
    </Route>
  )
);

export const App = () => <RouterProvider router={router} />;
