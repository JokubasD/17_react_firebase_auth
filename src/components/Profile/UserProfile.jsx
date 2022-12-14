import { sendRequest } from '../../helper/helper';
import { useAuthCtx } from '../../store/AuthContext';
import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  const { token } = useAuthCtx();
  const sendVerify = async () => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${
      import.meta.env.VITE_API_KEY
    }`;
    const sendObj = {
      requestType: 'VERIFY_EMAIL',
      idToken: token,
    };
    const [ats, err] = await sendRequest(sendObj, url);
    console.log('ats ===', ats);
    console.log('err ===', err);
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
      <button onClick={sendVerify}>Verify email</button>
    </section>
  );
};

export default UserProfile;
