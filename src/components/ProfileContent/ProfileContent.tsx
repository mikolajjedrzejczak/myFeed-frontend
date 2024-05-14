import styles from '../../pages/Profile/Profile.module.scss';

import { useState } from 'react';
import CategoryButtons from '../CategoryButtons/CategoryButtons';
import { Loader } from '../Loader/Loader';
import { Media } from '../Media/Media';
import Posts from '../Posts/Posts';
import { PostMediaProps, PostProps } from '../../types/post';
import { CONTENT_TYPE } from '../../constants/constants';

interface ProfileContentProps {
  isLoading: boolean;
  error: string;
  posts: PostProps[];
}

const ProfileContent = ({ isLoading, error, posts }: ProfileContentProps) => {
  const [category, setCategory] = useState<string>('posts');

  console.log(posts);

  const getImages = (): PostMediaProps[] => {
    if (posts.length > 0) {
      const allMedia = posts.map((post: PostProps) => post.media).flat();

      const filteredMedia = allMedia.filter(
        (media: PostMediaProps) =>
          media !== null && media !== undefined && media.post_img
      );

      return filteredMedia;
    }
    return [];
  };
  return (
    <>
      <CategoryButtons
        setCategory={setCategory}
        category={category}
        secondCat="media"
      />
      <div
        className={
          category === CONTENT_TYPE.posts
            ? styles.postsContainer
            : getImages().length > 0
            ? styles.mediaPost
            : ''
        }
      >
        {error && <span>{error}</span>}
        {category === CONTENT_TYPE.media ? (
          isLoading ? (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          ) : getImages().length > 0 ? (
            getImages().map((post: any) => <Media key={post.id} {...post} />)
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '260px',
              }}
            >
              <div>NO PHOTOS</div>
            </div>
          )
        ) : null}

        {category === CONTENT_TYPE.posts ? (
          isLoading ? (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          ) : posts?.length > 0 ? (
            <div className={styles.posts}>
              <Posts posts={posts} />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '260px',
              }}
            >
              <div>NO POSTS</div>
            </div>
          )
        ) : null}
      </div>
    </>
  );
};

export default ProfileContent;
