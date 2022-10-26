import { GetStaticProps, NextPage } from 'next';
import { sanityClient, urlFor } from '../../sanity';

import Header from '../../components/Header';
import { IFormInput, Post } from '../../typings';
import ArticleBody from '../../components/ArticleBody';
import CommentForm from '../../components/CommentForm';
import { SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import queries from '../../constants/queries';

interface Props {
  post: Post;
}

const Post: NextPage<Props> = ({ post }) => {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.error(err);
        setSubmitted(false);
      });
  };

  return (
    <main>
      <Header />
      <img
        className='w-full h-40 object-cover'
        src={urlFor(post.mainImage).url()!}
        alt=''
      />
      <ArticleBody post={post} />
      <hr className='max-w-lg my-5 mx-auto border-yellow-500' />
      {submitted ? (
        <div className='flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto'>
          <h3 className='text-3xl font-bold'>
            Thank you for submitting your comment!
          </h3>
          <p>Once it has been approved, it will appear bellow!</p>
        </div>
      ) : (
        <CommentForm post={post} onSubmit={onSubmit} />
      )}

      <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow shadow-yellow-500 gap-2'>
        <h3 className='text-4xl'>Comments</h3>
        <hr />

        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className='text-yellow-500'>{comment.name}:</span>{' '}
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};
export default Post;

export const getStaticPaths = async () => {
  const query = queries.GET_POST_FOR_STATIC_PATHS;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = queries.GET_SPECIFIC_POST;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post)
    return {
      notFound: true,
    };

  return {
    props: {
      post,
    },
    revalidate: 1,
  };
};
