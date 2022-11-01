import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { v4 as uuidv4 } from 'uuid';
import Pagination from '@mui/material/Pagination';
import { PacmanLoader } from 'react-spinners';
import Alert from '@mui/material/Alert';

import { getArticles } from '../services/getArticles';
import { Article } from '../Article/Article';
import { fetchOffset } from '../redux/actions/articles';

import classes from './ListArticles.module.scss';

export const ListArticles = () => {
  const { articlesList, articlesCount, isLoading, error } = useSelector((store) => store.articles);
  const dispatch = useDispatch();

  const items = articlesList.map((el) => <Article key={uuidv4()} {...el} />);
  const count = Math.ceil(articlesCount / 20);

  const { offset } = useSelector((store) => store.articles);

  useEffect(() => {
    dispatch(getArticles(offset));
  }, [offset]);

  return !isLoading ? (
    <div className={classes.articles}>
      <PacmanLoader color="#1890ff" cssOverride={{}} margin={2} size={30} speedMultiplier={1} />
    </div>
  ) : error ? (
    <div className={classes.articles}>
      <Alert width="100%" severity="error">
        При загрузке данных произошла ошибка. Проверьте адрес и обновите страницу.
      </Alert>
    </div>
  ) : (
    <>
      <div className={classes.articles}>{items}</div>
      <Pagination
        className={classes.pagination}
        count={count}
        shape="rounded"
        color="primary"
        size="small"
        onChange={(_, value) => {
          const page = (value - 1) * 20;
          dispatch(fetchOffset(page));
        }}
      />
    </>
  );
};
