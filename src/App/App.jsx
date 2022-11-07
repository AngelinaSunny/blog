import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux/es/exports';

import { Layout } from '../Layout/Layout';
import { SlugArticle, getSlugArticle } from '../SlugArticle/SlugArticle';
import { ListArticles } from '../ListArticles/ListArticles';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { CreateAccount } from '../CreateAccount/CreateAccount';
import { SignIn } from '../SignIn/SignIn';
import { EditProfile } from '../EditProfile/EditProfile';
import { getAuthorizedUser } from '../services/getAuthorizedUser';
import { NewArticle } from '../NewArticle/NewArticle';
import { RequireAuth } from '../hoc/RequireAuth';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<ListArticles />} />
      <Route path="sign-up" element={<CreateAccount />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="profile" element={<EditProfile />} />
      <Route
        path="new-article"
        element={
          <RequireAuth>
            <NewArticle />
          </RequireAuth>
        }
      />
      <Route path="articles" element={<ListArticles />} />
      <Route path="articles/:slug" element={<SlugArticle />} loader={getSlugArticle} errorElement={<ErrorPage />} />
      <Route path="articles/:slug/edit" element={<NewArticle />} />
    </Route>
  )
);

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuthorizedUser());
  }, []);

  return <RouterProvider router={router} />;
};
