import classes from './AuthorizedHeader.module.scss';
import avatar from './avatar.png';

export const AuthorizedHeader = () => (
  <div className={classes['header-buttons']}>
    <button type="button" className={classes['create-article']}>
      create article
    </button>
    <div>
      <span>john doe</span>
      <img src={avatar} alt="avatar" />
    </div>
    <button type="button" className={classes['log-out']}>
      log out
    </button>
  </div>
);
