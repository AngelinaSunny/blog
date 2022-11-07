import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Fade } from '@mui/material';

import { postNewArticle } from '../services/postNewArticle';
import { putArticleEdit } from '../services/putArticleEdit';

import classes from './newArticle.module.scss';

export const NewArticle = () => {
  const location = useLocation();
  const navigation = useNavigate();

  const dataSlug = location.state;
  const { pathname } = location;
  const slug = pathname.split('/')[2];

  const createTagsList = [];

  if (dataSlug) {
    dataSlug.tagList.forEach((el) => {
      createTagsList.push({ tag: el });
    });
  }
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      tagList: dataSlug ? createTagsList : [{ tag: '' }, { tag: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });
  const [success, setSuccess] = useState(false);

  return (
    <>
      <Fade
        in={success}
        timeout={{ enter: 0, exit: 3000 }}
        addEndListener={() => {
          setTimeout(() => {
            setSuccess(false);
          }, 2000);
        }}
      >
        <Alert severity="success">The article has been successfully created!</Alert>
      </Fade>
      <div className={classes['form-wrap']}>
        <h6>{dataSlug ? 'Edit article' : 'Create new article'}</h6>
        <form
          onSubmit={handleSubmit(async (data) => {
            let res;
            if (!dataSlug) {
              res = await postNewArticle(data);
            } else {
              res = await putArticleEdit(data, slug);
            }
            if (res === 'ok') {
              setSuccess(true);
              reset();
              navigation('/articles');
            }
          })}
        >
          <label>
            <p>Title</p>
            <input
              placeholder="Title"
              defaultValue={dataSlug ? dataSlug.title : ''}
              className={errors.title ? classes['input-error'] : null}
              {...register('title', { required: 'The field must be filled in!' })}
            />
            <p className={classes.errors}>{errors.title?.message}</p>
          </label>
          <label>
            <p>Short description</p>
            <input
              placeholder="Short description"
              defaultValue={dataSlug ? dataSlug.description : ''}
              className={errors.description ? classes['input-error'] : null}
              {...register('description', { required: 'The field must be filled in!' })}
            />
            <p className={classes.errors}>{errors.description?.message}</p>
          </label>
          <label>
            <p>Text</p>
            <textarea
              rows="10"
              placeholder="Text"
              defaultValue={dataSlug ? dataSlug.text : ''}
              className={errors.text ? classes['input-error'] : null}
              {...register('text', { required: 'The field must be filled in!' })}
            />
            <p className={classes.errors}>{errors.text?.message}</p>
          </label>
          <div className={classes['tags-wrap']}>
            <div>
              <p>Tags</p>
              {fields.map((item, index) => (
                <label key={item.id}>
                  <input
                    className={classes.tag}
                    placeholder="Tag"
                    {...register(`tagList.${index}.tag`, { required: false })}
                  />
                  <button type="button" className={classes['tag-button']} onClick={() => remove(index)}>
                    Delete
                  </button>
                </label>
              ))}
            </div>
            <button type="button" className={classes['add-button']} onClick={() => append({ tag: '' })}>
              Add tag
            </button>
          </div>
          <button className={classes.send} type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
};
