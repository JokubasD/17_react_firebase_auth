import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';

import classes from './AuthForm.module.css';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthContext';
import { sendRequest } from '../../helper/helper';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const history = useHistory();
  const ctx = useAuthCtx();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formik = useFormik({
    initialValues: {
      email: 'James@bond.com',
      password: '123456',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      // register or login
      const regOrLogin = isLogin ? 'login' : 'register';
      console.log('values ===', values, 'mode', regOrLogin);

      // jei regOrLogin === register
      // tai url = https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
        import.meta.env.VITE_API_KEY
      }`;

      if (regOrLogin === 'login') {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
          import.meta.env.VITE_API_KEY
        }`;
      }

      const [sendResult, postError] = await sendRequest(values, url);

      // jei turim klaidu
      if (postError) {
        console.warn('postError ===', postError);
        // if errro === '"EMAIL_EXISTS"' tai msg "toks email egzistuoja"
        formik.setErrors({
          password: postError.error.message,
        });
        return;
      }
      // nera klaidu gauti duomenys yra sendResult
      console.log('sendResult ===', sendResult);
      ctx.login(sendResult);
      history.push('/profile');
      // jei nera klaidu naviguojam i /profile puslapi
    },
  });
  // console.log('env api key: ', import.meta.env.VITE_API_KEY);
  // console.log('formik.errors ===', formik.errors);
  return (
    <section className={classes.auth}>
      <h2 style={{ color: 'white' }}>
        Debug: {formik.values.email} - {formik.values.password}
        <br />
        our env town {import.meta.env.VITE_TOWN}
      </h2>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={formik.handleSubmit} autoComplete='off'>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input
            type='email'
            id='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && (
            <p className={classes.errorP}>{formik.errors.password}</p>
          )}
        </div>
        <div className={classes.actions}>
          <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
