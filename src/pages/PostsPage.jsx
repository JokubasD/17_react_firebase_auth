import { fireObjToArr, getData, patchRequest } from '../helper/helper';
import useFetch from '../hooks/useFetch';
import { useAuthCtx } from '../store/AuthContext';

function PostsPage(props) {
  const { token } = useAuthCtx();
  const url = `${
    import.meta.env.VITE_REAL_DB_URL
  }/firePost/posts.json?orderBy="archived"&equalTo=false`;
  const [dataFromFireB, setDataFromFireB] = useFetch(url, {});
  const dataArr = fireObjToArr(dataFromFireB);
  console.log('dataArr ===', dataArr);

  const deleteHandler = async (id) => {
    const url = `${
      import.meta.env.VITE_REAL_DB_URL
    }/firePost/posts/${id}.json?`;
    const [answer, error] = await patchRequest(url, { archived: true });
    if (error) {
      console.log('error ===', error);
      return;
    }

    const [data, errorGet] = await getData(url);
    console.log('errorGet ===', errorGet);
    console.log('data ===', data);
    setDataFromFireB(data);
  };
  return (
    <div className='container'>
      <h1>PostsPage</h1>
      <p>posts should appear here</p>
      <ul>
        {dataArr.map((pObj) => (
          <li key={pObj.postId}>
            <img src={pObj.image} alt='some image'></img>
            <h2>{pObj.title}</h2>
            <button onClick={() => deleteHandler(pObj.postId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PostsPage;
