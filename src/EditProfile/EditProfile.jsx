import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { setNewImg, setNewUsername, setNewEmail, setNewPassword } from '../redux/actions/personLogIn';

import classes from './editProfile.module.scss';

export const EditProfile = () => {
  const navigation = useNavigate();
  const { email, username } = useSelector((state) => state.personLogIn);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const dispatch = useDispatch();

  return (
    <div className={classes['form-wrapper']}>
      <h6>Edit Profile</h6>
      <form
        onSubmit={handleSubmit((data) => {
          if (data.avatar) {
            dispatch(setNewImg(data.avatar));
            localStorage.setItem('avatar', data.avatar);
          }
          if (data.username) {
            dispatch(setNewUsername(data.username));
            localStorage.setItem('username', data.username);
          }
          if (data.email) {
            dispatch(setNewEmail(data.email));
            localStorage.setItem('email', data.email);
          }
          if (data.password) {
            dispatch(setNewPassword(data.password));
            localStorage.setItem('password', data.password);
          }
          reset({ password: '', avatar: '' });
          navigation('../articles');
        })}
      >
        <label>
          <p>Username</p>
          <input
            placeholder="Username"
            defaultValue={username}
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
            defaultValue={email}
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
          <p>New password</p>
          <input
            type="password"
            placeholder="New password"
            className={errors.password ? classes['input-error'] : null}
            {...register('password', {
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
          <p>Avatar image (url)</p>
          <input
            type="url"
            placeholder="Avatar image"
            className={errors.avatar ? classes['input-error'] : null}
            {...register('avatar', {
              required: false,
            })}
          />
          <p className={classes.errors}>{errors.avatar?.message}</p>
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};