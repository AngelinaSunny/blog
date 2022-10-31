import { Outlet } from 'react-router-dom';

import { Header } from '../Header/Header';

import classes from './layout.module.scss';

export const Layout = () => (
  <div className={classes.layout}>
    <Header />
    <main className={classes.main}>
      <Outlet />
    </main>
  </div>
);
