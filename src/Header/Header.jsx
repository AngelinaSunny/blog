import { useSelector } from 'react-redux';

import { NotAuthorizedHeader } from '../NotAuthorizedHeader/NotAuthorizedHeader';
import { AuthorizedHeader } from '../AuthorizedHeader/AuthorizedHeader';

import classes from './Header.module.scss';

export const Header = () => {
  const { isAuthorized } = useSelector((state) => state.person);

  return (
    <div className={classes.header}>
      <h6>Realworld Blog</h6>
      {isAuthorized ? <AuthorizedHeader /> : <NotAuthorizedHeader />}
    </div>
  );
};
