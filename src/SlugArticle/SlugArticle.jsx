import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { intlFormat } from 'date-fns';
import { useLoaderData, defer, Await, Link, useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { PacmanLoader } from 'react-spinners';
import { Suspense, useState } from 'react';

import { deleteArticle } from '../services/deleteArticle';

import classes from './slugArticle.module.scss';

export const SlugArticle = () => {
  const { article } = useLoaderData();
  const [open, setOpen] = useState(false);

  const { isAuthorized, username } = useSelector((state) => state.personLogIn);
  const location = useLocation();
  const slug = location.pathname;
  const navigation = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <article className={classes.article}>
      <Suspense fallback={<PacmanLoader color="#1890ff" cssOverride={{}} margin={2} size={30} speedMultiplier={1} />}>
        <Await resolve={article}>
          {(resolvedArticle) => {
            const art = resolvedArticle.article;
            return (
              <>
                <section className={classes['article-wrapper']}>
                  <div className={classes.info}>
                    <div>
                      <h6 className={classes.header}>{art.title}</h6>
                      <button type="button" disabled={!isAuthorized}>
                        {art.favorited ? (
                          <span className={classes.red}> ❤ </span>
                        ) : (
                          <span className={classes.empty}> ♡ </span>
                        )}
                      </button>
                      <span>{art.favoritesCount}</span>
                    </div>
                    <div className={classes.tag}>
                      {art.tagList.length > 1 ? (
                        art.tagList.map((tag) => (/\s/g.test(tag) ? null : <div key={uuidv4()}>{tag}</div>))
                      ) : art.tagList.join('').trim() !== '' ? (
                        <div>{art.tagList}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className={classes.author}>
                    <span className={classes.name}>{art.author.username}</span>
                    <span className={classes.data}>
                      {intlFormat(
                        new Date(art.createdAt),
                        {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        },
                        { locale: 'en-US' }
                      )}
                    </span>
                    <img src={art.author.image} alt="avatar" />
                    {isAuthorized && art.author.username === username && (
                      <div className={classes['button-wrap']}>
                        <button type="button" className={classes.delete} onClick={handleClickOpen}>
                          Delete
                        </button>
                        {open && (
                          <div className={classes.modal}>
                            <div />
                            <p>Are you sure to delete this article?</p>
                            <div className={classes['modal-btns']}>
                              <button type="button" onClick={handleClose}>
                                No
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  const res = await deleteArticle(slug);
                                  if (res === 'ok') {
                                    navigation('/articles');
                                  }
                                }}
                              >
                                Yes
                              </button>
                            </div>
                          </div>
                        )}
                        <Link
                          to="edit"
                          className={classes.edit}
                          state={{
                            title: art.title,
                            description: art.description,
                            text: art.body,
                            tagList: art.tagList,
                          }}
                        >
                          Edit
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className={classes.description}>{art.description}</div>
                </section>
                <ReactMarkdown className={classes.body}>{art.body}</ReactMarkdown>
              </>
            );
          }}
        </Await>
      </Suspense>
    </article>
  );
};

async function fetchArticle(slug) {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
    .then((result) => {
      if (!result.ok) {
        throw new Response('', { status: result.status, statusText: 'Not found' });
      }
      return result.json();
    })
    .then((data) => data);

  return res;
}

export const getSlugArticle = async ({ params }) => {
  const { slug } = params;
  return defer({
    article: fetchArticle(slug),
  });
};
