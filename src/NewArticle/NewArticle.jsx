import { useForm, useFieldArray } from 'react-hook-form';

import classes from './newArticle.module.scss';

export const NewArticle = () => {
  const { register, control, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: { tag: [{ inputTag: '' }, { inputTag: '' }] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tag',
  });

  return (
    <div className={classes['form-wrap']}>
      <h6>Create new article</h6>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <label>
          <p>Title</p>
          <input placeholder="Title" {...register('title', { required: true })} />
        </label>
        <label>
          <p>Short description</p>
          <input placeholder="Short description" {...register('description', { required: true })} />
        </label>
        <label>
          <p>Text</p>
          <input type="textarea" placeholder="Text" {...register('text', { required: true })} />
        </label>
        <div className={classes['tags-wrap']}>
          <div>
            <p>Tags</p>
            {fields.map((item, index) => (
              <label key={item.id}>
                <input
                  className={classes.tag}
                  placeholder="Tag"
                  {...register(`tag.${index}.inputTag`, { required: false })}
                />
                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </label>
            ))}
          </div>
          <button type="button" onClick={() => append({ inputTag: '' })}>
            Add tag
          </button>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
