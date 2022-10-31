import classes from './NotAuthorizedHeader.module.scss';

export const NotAuthorizedHeader = () => (
  <div className={classes['header-buttons']}>
    <button type="button" className={classes['btn-in']}>
      sing in
    </button>
    <button type="button" className={classes['btn-up']}>
      sing up
    </button>
  </div>
);
