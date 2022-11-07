import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Alert, Fade } from '@mui/material';

import { fetchLogIn } from '../services/fetchLogIn';
import { setError } from '../redux/actions/person';

import classes from './SignIn.module.scss';

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });
  const navigation = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/';

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.person);

  return (
    <>
      <Fade
        in={error}
        timeout={{ enter: 0, exit: 3000 }}
        addEndListener={() => {
          setTimeout(() => {
            dispatch(setError(false));
          }, 2000);
        }}
      >
        <Alert severity="error">Check the correctness of the entered data</Alert>
      </Fade>
      <div className={classes['form-wrapper']}>
        <h6>Sign In</h6>
        <form
          onSubmit={handleSubmit(async (data) => {
            const res = await dispatch(fetchLogIn(data));
            if (res === 'ok') {
              reset();
              navigation(fromPage);
            }
          })}
        >
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
          <button type="submit" disabled={!isValid}>
            Login
          </button>
          <p>
            Don&#39;t have an account? <Link to="../sign-up">Sign Up</Link>.
          </p>
        </form>
      </div>
    </>
  );
};
