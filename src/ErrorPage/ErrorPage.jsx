import { useRouteError } from 'react-router-dom';

import imgError from './errorImg.png';

export const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>{error.status}</h1>
      <h2>{error.statusText || 'Something goes wrong!'}</h2>
      <img src={imgError} alt="img" />
    </div>
  );
};
