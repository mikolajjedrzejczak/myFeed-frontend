import { PostProps } from '../../types/post';
import SinglePost from './PostCard/PostCard';

interface PostsProps {
  posts: PostProps[];
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <>
      {posts.map((post: PostProps) => {
        return <SinglePost post={post} key={post.id} />;
      })}
    </>
  );
};

export default Posts;
