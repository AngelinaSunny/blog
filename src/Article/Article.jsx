import { intlFormat } from 'date-fns';
import { useSelector } from 'react-redux/es/exports';
import { v4 as uuidv4 } from 'uuid';
import { Link, useMatch } from 'react-router-dom';
import { useState } from 'react';

import { fetchFavorite } from '../services/fetchFavorite';

import classes from './Article.module.scss';

export const Article = ({ slug, favorited, tagList, createdAt, title, favoritesCount, author, description }) => {
  const { isAuthorized } = useSelector((store) => store.personLogIn);
  const match = useMatch('/articles');
  const linkSlug = match ? slug : `articles/${slug}`;
  const [favorit, setFavorit] = useState(favorited);
  const [favoritCount, setFavoritCount] = useState(favoritesCount);

  const like = favorit ? <span className={classes.red}> ❤ </span> : <span className={classes.empty}> ♡ </span>;
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

  return (
    <article className={classes.article}>
      <div className={classes.info}>
        <div>
          <Link to={`${linkSlug}`} className={classes.header}>
            {title}
          </Link>
          <button
            type="button"
            disabled={!isAuthorized}
            onClick={() => {
              if (favorit) {
                fetchFavorite(slug, 'DELETE');
                setFavorit(false);
                setFavoritCount(favoritCount - 1);
              }
              if (!favorit) {
                fetchFavorite(slug, 'POST');
                setFavorit(true);
                setFavoritCount(favoritCount + 1);
              }
            }}
          >
            {like}
          </button>
          <span>{favoritCount}</span>
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
