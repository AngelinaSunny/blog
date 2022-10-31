import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { intlFormat } from 'date-fns';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// import { getSlugArticle } from '../services/getSlugArticle';

import classes from './slugArticle.module.scss';

export const SlugArticle = () => {
  const [article, setArticle] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const { slug } = useParams();
  const { isAuthorized } = useSelector((state) => state.person);

  useEffect(() => {
    setIsLoaded(false);
    fetch(`https://blog.kata.academy/api/articles/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw Error('Ошибка запроса статьи');
        }
        return res.json();
      })
      .then((json) => {
        setArticle(json.article);
        setIsLoaded(true);
      })
      .catch((e) => console.log(e.message));
  }, [slug]);
  console.log(article);
  // console.log(articleThis title, description, body, createdAt, tagList, favorited, favoritesCount, author);
  // const like = article.favorited ? (
  //   <span className={classes.red}> ❤ </span>
  // ) : (
  //   <span className={classes.empty}> ♡ </span>
  // );
  // const tags = useCallback(
  //   () =>
  //     article.tagList.length > 1 ? (
  //       article.tagList.map((tag) => (/\s/g.test(tag) ? null : <div key={uuidv4()}>{tag}</div>))
  //     ) : article.tagList.join('').trim() !== '' ? (
  //       <div>{article.tagList}</div>
  //     ) : null,
  //   [isLoaded, article.tagList]
  // );

  // const dataPost = intlFormat(
  //   new Date(article.createdAt),
  //   {
  //     month: 'long',
  //     day: 'numeric',
  //     year: 'numeric',
  //   },
  //   { locale: 'en-US' }
  // );

  return !isLoaded ? (
    <div> wait</div>
  ) : (
    //
    <article className={classes.article}>
      <section className={classes['article-wrapper']}>
        <div className={classes.info}>
          <div>
            <h6 className={classes.header}>{article.title}</h6>
            <button type="button" disabled={!isAuthorized}>
              {article.favorited ? (
                <span className={classes.red}> ❤ </span>
              ) : (
                <span className={classes.empty}> ♡ </span>
              )}
            </button>
            <span>{article.favoritesCount}</span>
          </div>
          <div className={classes.tag}>
            {article.tagList.length > 1 ? (
              article.tagList.map((tag) => (/\s/g.test(tag) ? null : <div key={uuidv4()}>{tag}</div>))
            ) : article.tagList.join('').trim() !== '' ? (
              <div>{article.tagList}</div>
            ) : null}
          </div>
        </div>
        <div className={classes.author}>
          <span className={classes.name}>{article.author.username}</span>
          <span className={classes.data}>
            {intlFormat(
              new Date(article.createdAt),
              {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              },
              { locale: 'en-US' }
            )}
          </span>
          <img src={article.author.image} alt="avatar" />
        </div>
        <div className={classes.description}>{article.description}</div>
      </section>
      <ReactMarkdown className={classes.body}>{article.body}</ReactMarkdown>
    </article>
  );
};
