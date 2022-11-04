import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { Layout } from '../Layout/Layout';
import { SlugArticle, getSlugArticle } from '../SlugArticle/SlugArticle';
import { ListArticles } from '../ListArticles/ListArticles';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { CreateAccount } from '../CreateAccount/CreateAccount';
import { SignIn } from '../SignIn/SignIn';
import { EditProfile } from '../EditProfile/EditProfile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<ListArticles />} />
      <Route path="sign-up" element={<CreateAccount />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="profile" element={<EditProfile />} />
      <Route path="articles" element={<ListArticles />} />
      <Route path="articles/:slug" element={<SlugArticle />} loader={getSlugArticle} errorElement={<ErrorPage />} />
    </Route>
  )
);

export const App = () => <RouterProvider router={router} />;
