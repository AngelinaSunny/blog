import { Link } from 'react-router-dom';

import classes from './NotAuthorizedHeader.module.scss';

export const NotAuthorizedHeader = () => (
  <div className={classes['header-links']}>
    <Link to="sign-in" className={classes['link-in']}>
      sign in
    </Link>
    <Link to="sign-up" className={classes['link-up']}>
      sign up
    </Link>
  </div>
);
