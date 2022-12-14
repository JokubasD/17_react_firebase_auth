import { useHistory } from 'react-router-dom';
import AddPostForm from '../components/Posts/AddPostForm';
import { sendRequest } from '../helper/helper';
import useRedirect from '../hooks/useRedirect';
import { useAuthCtx } from '../store/AuthContext';

// const dummyPost = {
//   image: 'https://picsum.photos/id/12/200/300',
//   title: 'First firebase post',
//   body: 'funniest post ever',
//   userId: '',
//   archived: false,
// };
function AddPost(props) {
  const history = useHistory();
  const { userID } = useAuthCtx();
  const handleNewPost = async (formValues) => {
    console.log('formValues ===', formValues);
    formValues.userId = userID;
    const url = `${import.meta.env.VITE_REAL_DB_URL}/firePost/posts.json`;
    const [answer, error] = await sendRequest(dummyPost, url);
    console.log('answer ===', answer);
    console.log('error ===', error);
    history.push('/posts');
  };

  return (
    <div className='container'>
      <h1>AddPost</h1>
      <p>A form will be here</p>
      <AddPostForm onNewPost={handleNewPost} />
      {/* <button onClick={handleNewPost}>Create Post</button> */}
    </div>
  );
}
export default AddPost;
