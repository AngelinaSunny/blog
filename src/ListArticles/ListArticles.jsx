import { useSelector, useDispatch } from 'react-redux/es/exports';
import { v4 as uuidv4 } from 'uuid';
import Pagination from '@mui/material/Pagination';
import { PacmanLoader } from 'react-spinners';

import { Article } from '../Article/Article';
import { fetchOffset } from '../redux/actions/articles';

import classes from './ListArticles.module.scss';

export const ListArticles = () => {
  const { articlesList, articlesCount, isLoading } = useSelector((store) => store.articles);
  const dispatch = useDispatch();

  const items = articlesList.map((el) => <Article key={uuidv4()} {...el} />);
  const count = Math.ceil(articlesCount / 20);

  return !isLoading ? (
    <div className={classes.articles}>
      <PacmanLoader color="#1890ff" cssOverride={{}} margin={2} size={30} speedMultiplier={1} />
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
