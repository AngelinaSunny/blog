import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux/es/exports';

import { postNewPerson } from '../services/postNewPerson';

import classes from './createAccount.module.scss';

export const CreateAccount = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: 'onChange' });
  const navigation = useNavigate();

  return (
    <div className={classes['form-wrapper']}>
      <h6>Create new account</h6>
      <form
        onSubmit={handleSubmit(async (data) => {
          const res = await dispatch(postNewPerson(data));
          if (res === 'ok') {
            reset();
            navigation('../sign-in');
          }
        })}
      >
        <label>
          <p>Username</p>
          <input
            placeholder="Username"
            className={errors.username ? classes['input-error'] : null}
            {...register('username', {
              required: 'Username must be 3 to 20 characters long',
              minLength: {
                value: 3,
                message: 'Username needs to be at least 6 characters.',
              },
              maxLength: {
                value: 21,
                message: 'Username must not exceed 40 characters.',
              },
              pattern: {
                value: /[-A-Za-z0-9_\s]+$/i,
                message: 'Valid characters are letters, numbers, spaces, underscores and hyphens',
              },
            })}
          />
          <p className={classes.errors}>{errors.username?.message}</p>
        </label>
        <label>
          <p>Email address</p>
          <input
            type="email"
            placeholder="Email address"
            className={errors.email ? classes['input-error'] : null}
            {...register('email', {
              required: true,
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i,
                message: 'Enter correctly email address',
              },
            })}
          />
          <p className={classes.errors}>{errors.email?.message}</p>
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            placeholder="Password"
            className={errors.password ? classes['input-error'] : null}
            {...register('password', {
              required: true,
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters.',
              },
              maxLength: {
                value: 41,
                message: 'The password must not exceed 40 characters.',
              },
            })}
          />
          <p className={classes.errors}>{errors.password?.message}</p>
        </label>
        <label>
          <p>Repeat password</p>
          <input
            type="password"
            placeholder="Password"
            className={errors.passwordRepeat ? classes['input-error'] : null}
            {...register('passwordRepeat', {
              validate: (value) => (value === watch('password') ? true : 'Passwords must match'),
            })}
          />
          <p className={classes.errors}>{errors.passwordRepeat?.message}</p>
        </label>
        <label>
          <input
            type="checkbox"
            defaultChecked
            className={errors.check ? classes['input-error'] : null}
            {...register('check', {
              required: 'Confirm your consent to personal data processing',
            })}
          />

          <span>I agree to the processing of my personal information</span>
          <p className={classes.errors}>{errors.check?.message}</p>
        </label>
        <button type="submit" disabled={!isValid}>
          Create
        </button>
        <p>
          Already have an account? <Link to="../sign-in">Sign In</Link>.
        </p>
      </form>
    </div>
  );
};
