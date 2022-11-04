import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/es/exports';

import { setNotAuthorized } from '../redux/actions/personLogIn';

import classes from './AuthorizedHeader.module.scss';

export const AuthorizedHeader = () => {
  const dispatch = useDispatch();
  const { username, avatar } = useSelector((state) => state.personLogIn);
  const navigation = useNavigate();

  return (
    <div className={classes['header-buttons']}>
      <button type="button" className={classes['create-article']}>
        create article
      </button>
      <Link to="profile">
        <span>{username}</span>
        <img src={avatar} alt="avatar" />
      </Link>
      <button
        type="button"
        className={classes['log-out']}
        onClick={() => {
          dispatch(setNotAuthorized());
          localStorage.clear();
          navigation('../article');
        }}
      >
        log out
      </button>
    </div>
  );
};
