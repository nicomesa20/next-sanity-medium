import { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormInput, Post } from '../typings';

interface Props {
  post: Post;
  onSubmit: SubmitHandler<IFormInput>;
}

const CommentForm: NextPage<Props> = ({ post, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col p-5 max-w-2xl mx-auto mb-10'
    >
      <h4 className='text-sm text-yellow-500 font-semibold'>
        Enjoyed this article?
      </h4>
      <h3 className='text-3xl font-bold'>Leave a comment below!</h3>
      <hr className='py-3 mt-2'></hr>
      <input {...register('_id')} value={post._id} name='_id' type='hidden' />
      <label className='block mb-5' htmlFor='name'>
        <span className='text-gray-700'>Name</span>
        <input
          {...register('name', { required: true })}
          className='shadow border rounded py-2 px-3 form-input mt-1 block w-full focus:outline-none focus:ring ring-yellow-500'
          placeholder='Jhon Doe'
          type='text'
        />
      </label>
      <label className='block mb-5' htmlFor='email'>
        <span className='text-gray-700'>Email</span>
        <input
          {...register('email', { required: true })}
          className='shadow border rounded py-2 px-3 form-input mt-1 block w-full focus:outline-none focus:ring ring-yellow-500'
          placeholder='jhon@email.com'
          type='email'
        />
      </label>
      <label className='block mb-5' htmlFor='comment'>
        <span className='text-gray-700'>Comment</span>
        <textarea
          {...register('comment', { required: true })}
          className='shadow border rounded py-2 px-3 form-input mt-1 block w-full focus:outline-none focus:ring ring-yellow-500 form-textarea'
          rows={8}
        />
      </label>

      <div className='flex flex-col p-1 gap-1'>
        {errors.name && (
          <span className='text-red-500'>The name is required</span>
        )}
        {errors.email && (
          <span className='text-red-500'>The email is required</span>
        )}
        {errors.comment && (
          <span className='text-red-500'>The comment is required</span>
        )}
      </div>
      <input
        type='submit'
        className='shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow focus:outline-none text-white font-bold p-2 cursor-pointer'
      />
    </form>
  );
};
export default CommentForm;
