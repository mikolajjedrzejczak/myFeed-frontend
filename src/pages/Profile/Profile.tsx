import styles from './Profile.module.scss';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import { Loader } from '../../components/Loader/Loader';
import { useFetch } from '../../hooks/useFetch';
import ImageToFullScreen from '../../components/Modals/ImageToFullScreenModal/ImageToFullScreenModal';
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import { EditProfileModal } from '../../components/Modals/EditProfileModal/EditProfileModal';
import UserModal from '../../components/Modals/UserModal/UserListModal';

const Profile = () => {
  const username = useLocation().pathname.split('/')[2];
  const [editActive, setEditActive] = useState<boolean>(false);
  const [followersActive, setFollowersActive] = useState<boolean>(false);
  const [isImageFull, setIsImageFull] = useState<boolean>(false);

  const {
    isLoading: isPostLoading,
    error: postError,
    data: posts,
  } = useFetch({
    baseURL: `/api/posts/user/${username}`,
    dep: username,
  });

  const { error: followersError, data: followers } = useFetch({
    baseURL: `/api/follows/followers/${username}`,
    dep: username,
  });
  followersError ? console.error(followersError) : null;

  const { error: likesError } = useFetch({
    baseURL: `/api/likes/profile/${username}`,
    dep: username,
  });
  likesError ? console.error(likesError) : null;

  const { error: userInfoError, data: userInfo } = useFetch({
    baseURL: `/api/users/${username}`,
    dep: username,
  });
  userInfoError ? console.error(userInfoError) : null;

  return (
    <>
      <UserModal
        close={setFollowersActive}
        activeModal={followersActive}
        users={followers}
      />
      <EditProfileModal close={setEditActive} activeModal={editActive} />
      {userInfo && (
        <ImageToFullScreen
          media={[{ post_img: userInfo[0]?.avatar }]}
          close={setIsImageFull}
          isActive={isImageFull}
        />
      )}
      <div className={styles.profile}>
        <div className={styles.container}>
          {!(userInfo?.length > 0) ? (
            <div className={styles.loader}>
              <Loader />
            </div>
          ) : (
            <>
              <ProfileInfo
                posts={posts}
                username={username}
                userInfo={userInfo}
                setIsImageFull={setIsImageFull}
                setEditActive={setEditActive}
                setFollowersActive={setFollowersActive}
                followers={followers}
              />
              <hr />
              <ProfileContent
                isLoading={isPostLoading}
                error={postError}
                posts={posts}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
