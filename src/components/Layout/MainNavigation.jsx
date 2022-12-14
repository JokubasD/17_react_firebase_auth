import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, useAuthCtx } from '../../store/AuthContext';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const { isUserLoggedIn, logout } = useAuthCtx();

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isUserLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isUserLoggedIn && (
            <>
              <li>
                <Link to='/posts'>Posts</Link>
              </li>
              <li>
                <Link to='/add-post'>Add Post</Link>
              </li>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
