import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { NotAuthorizedHeader } from '../NotAuthorizedHeader/NotAuthorizedHeader';
import { AuthorizedHeader } from '../AuthorizedHeader/AuthorizedHeader';

import classes from './Header.module.scss';

export const Header = () => {
  const { isAuthorized } = useSelector((state) => state.personLogIn);

  return (
    <div className={classes.header}>
      <Link to="/articles" className={classes.title}>
        Realworld Blog
      </Link>
      {isAuthorized ? <AuthorizedHeader /> : <NotAuthorizedHeader />}
    </div>
  );
};
