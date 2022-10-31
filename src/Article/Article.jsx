import { intlFormat } from 'date-fns';
import { useSelector } from 'react-redux/es/exports';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux/es/hooks/useDispatch';

// import { setSlugArticle } from '../redux/actions/slugArticle';

import classes from './Article.module.scss';

export const Article = ({ slug, favorited, tagList, createdAt, title, favoritesCount, author, description }) => {
  const { isAuthorized } = useSelector((store) => store.person);
  const like = favorited ? <span className={classes.red}> ❤ </span> : <span className={classes.empty}> ♡ </span>;
  const tags =
    tagList.length > 1 ? (
      tagList.map((tag) => (/\s/g.test(tag) ? null : <div key={uuidv4()}>{tag}</div>))
    ) : tagList.join('').trim() !== '' ? (
      <div>{tagList}</div>
    ) : null;

  const dataPost = intlFormat(
    new Date(createdAt),
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
    { locale: 'en-US' }
  );
  // const dispatch = useDispatch();

  return (
    <article className={classes.article}>
      <div className={classes.info}>
        <div>
          <Link to={`${slug}`} className={classes.header}>
            {title}
          </Link>
          <button type="button" disabled={!isAuthorized}>
            {like}
          </button>
          <span>{favoritesCount}</span>
        </div>
        <div className={classes.tag}>{tags}</div>
      </div>
      <div className={classes.author}>
        <span className={classes.name}>{author.username}</span>
        <span className={classes.data}> {dataPost}</span>
        <img src={author.image} alt="avatar" />
      </div>
      <div className={classes.description}>{description}</div>
    </article>
  );
};
