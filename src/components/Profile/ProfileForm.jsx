import { useState } from 'react';
import { sendRequest } from '../../helper/helper';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const [passwordValue, setPasswordValue] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${
      import.meta.env.VITE_API_KEY
    }`;
    const [sendResult, postError] = await sendRequest(
      {
        password: passwordValue,
        idToken: localStorage.getItem('firebaseToken'),
      },
      url
    );
    if (postError) {
      console.log('postError ===', postError);
      return;
    }
    console.log('sendResult ===', sendResult);
  }
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          type='password'
          id='new-password'
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
