import { useFormik } from 'formik';
import './AddPostForm.css';
import * as Yup from 'yup';
function AddPostForm(props) {
  const formik = useFormik({
    initialValues: {
      title: 'balls',
      image: '',
      body: '',
      archived: false,
      userId: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().url().required(),
      image: Yup.string().min(3).max(23).required(),
      body: Yup.string().min(10).required(),
    }),
    onSubmit: (values) => {
      console.log('values ===', values);
      props.onNewPost(values);
    },
  });

  return (
    <div className='addPost'>
      <h2>AddPostForm</h2>
      <form className='card' onSubmit={formik.onSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          onChange={formik.onChange}
          onBlur={formik.onBlur}
        />
        {formik.errors.title && formik.touched.title && (
          <p>{formik.errors.title}</p>
        )}
        <input
          type='url'
          name='image'
          placeholder='Image url'
          onChange={formik.onChange}
          onBlur={formik.onBlur}
        />
        {formik.errors.image && formik.touched.image && (
          <p>{formik.errors.image}</p>
        )}
        <textarea
          name='body'
          placeholder='your text'
          onChange={formik.handleChange}
          onBlur={formik.onBlur}
        ></textarea>
        {formik.errors.body && formik.touched.body && (
          <p>{formik.errors.body}</p>
        )}
        <button type='submit'>Add post</button>
      </form>
    </div>
  );
}
export default AddPostForm;
