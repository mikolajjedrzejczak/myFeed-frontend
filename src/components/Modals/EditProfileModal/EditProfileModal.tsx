import { ChangeEvent, useEffect, useState } from 'react';
import styles from './EditProfileModal.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// icons
import { AiOutlineLinkedin, AiOutlineUser, AiFillEdit } from 'react-icons/ai';
import { AiOutlineInstagram, AiOutlineYoutube } from 'react-icons/ai';
import EditPictureModal from '../EditPictureModal/EditPictureModal';
import { toast } from 'react-toastify';
import { scaleVariants } from '../../../animations/Animations';
import SocialMediaLink from './SocialMediaLink/SocialMediaLink';
import { useAuth } from '../../../context/Auth/AuthContext';
import CloseButton from '../../CloseButton/CloseButton';

type EditProfileModalProps = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  activeModal: boolean;
};

export const EditProfileModal = ({
  close,
  activeModal,
}: EditProfileModalProps) => {
  const { currentUser, setCurrentUser } = useAuth();

  const [userImgPreview, setUserImgPreview] = useState<any>(null);
  const [profImgPreview, setProfImgPreview] = useState<any>(null);
  const [avatar, setAvatar] = useState<string>(currentUser?.avatar || '');
  const [profile, setProfile] = useState<string>(
    currentUser?.profile_img || ''
  );
  const [name, setName] = useState<string>(currentUser?.name || '');
  const [bio, setBio] = useState<string>(currentUser?.bio || '');
  const [username, setUsername] = useState<string>(currentUser?.username || '');
  const [location, setLocation] = useState<string>(currentUser?.location || '');
  const [socialMedia, setSocialMedia] = useState({
    instagram: currentUser?.instagram_url || '',
    x: currentUser?.x_url || '',
    youtube: currentUser?.youtube_url || '',
  });
  const [editImage, setEditImage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  const onFileChange = async (e: ChangeEvent<any>) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setUserImgPreview(reader.result);
    };

    reader.readAsDataURL(file);
    setAvatar(e.target.files[0]);
  };

  const onFileProfChange = async (e: ChangeEvent<any>) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setProfImgPreview(reader.result);
    };

    reader.readAsDataURL(file);
    setProfile(e.target.files[0]);
  };

  const handleForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const formdata = new FormData();
      formdata.append('avatar', avatar);
      formdata.append('profile', profile);
      formdata.append('name', name);
      formdata.append('username', username);
      formdata.append('bio', bio);
      formdata.append('location', location);
      formdata.append('x', socialMedia.x);
      formdata.append('instagram', socialMedia.instagram);
      formdata.append('youtube', socialMedia.youtube);
      const res = await axios.post(
        `/api/users/update/${currentUser?.id}`,
        formdata,
        { withCredentials: true }
      );
      const { message, ...other } = res.data;
      setCurrentUser(other);
      toast.success(message);
      navigate(`/profile/${other.username}`);
      close(false);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (err: any) {
      toast.error(err.response.data.sqlMessage);
    }
    setIsUpdating(false);
  };

  const handleCancel = () => {
    close(false);
  };

  const handleDisabled = () => {
    if (
      currentUser?.name === name &&
      currentUser?.username === username &&
      currentUser?.bio === bio &&
      currentUser?.avatar === avatar &&
      (currentUser?.profile_img ?? '') === profile &&
      currentUser?.location === location &&
      currentUser?.x_url === socialMedia.x &&
      currentUser?.instagram_url === socialMedia.instagram &&
      currentUser?.youtube_url === socialMedia.youtube
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeModal]);

  return (
    <AnimatePresence mode="wait">
      {editImage?.length > 0 && editImage === profImgPreview && (
        <EditPictureModal
          image={profImgPreview}
          preview={setProfImgPreview}
          onClose={setEditImage}
          closePrev={close}
          cropShape="rect"
          aspect={15 / 5}
          output={setProfile}
          key={profImgPreview}
        />
      )}
      {editImage?.length > 0 && editImage === userImgPreview && (
        <EditPictureModal
          image={userImgPreview}
          preview={setUserImgPreview}
          onClose={setEditImage}
          closePrev={close}
          cropShape="round"
          aspect={1}
          output={setAvatar}
          key={userImgPreview}
        />
      )}
      {activeModal && (
        <div className={styles.editProfileModal} onClick={() => close(false)}>
          <motion.div
            variants={scaleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.container}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.top}>
              <h1>Edit Profile</h1>
              <CloseButton handleClick={() => close(false)} />
            </div>
            <hr />
            <form>
              <div className={styles.images}>
                <label htmlFor="profileImage" className={styles.profileImage}>
                  {profImgPreview || currentUser?.profile_img ? (
                    <>
                      <img
                        src={
                          profImgPreview
                            ? profImgPreview
                            : currentUser?.profile_img
                        }
                        className={styles.profileBackground}
                      />
                      {profImgPreview && (
                        <button
                          type="button"
                          className={styles.imageEdit}
                          onClick={() => setEditImage(profImgPreview)}
                        >
                          <AiFillEdit />
                        </button>
                      )}
                    </>
                  ) : (
                    <div className={styles.profilePlaceholder}></div>
                  )}
                </label>
                <label htmlFor="userImage" className={styles.userImage}>
                  {userImgPreview || currentUser?.avatar ? (
                    <>
                      <img
                        src={
                          userImgPreview ? userImgPreview : currentUser?.avatar
                        }
                        className={styles.userProfileImage}
                      />
                      {userImgPreview && (
                        <button
                          type="button"
                          className={styles.imageEdit}
                          onClick={() => setEditImage(userImgPreview)}
                        >
                          <AiFillEdit />
                        </button>
                      )}
                    </>
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      <AiOutlineUser />
                    </div>
                  )}
                </label>
              </div>
              <hr />
              <input
                type="file"
                name="file"
                onChange={onFileChange}
                id="userImage"
                accept="image/*"
              />
              <input
                type="file"
                name="file"
                onChange={onFileProfChange}
                id="profileImage"
                accept="image/*"
              />
              <label className={styles.name}>
                <span>Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <hr />
              <label className={styles.username}>
                <span>Username</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <hr />
              <label className={styles.location}>
                <span>Location</span>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </label>
              <hr />
              <label className={styles.bio}>
                <span>Bio</span>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </label>
              <hr />
              <SocialMediaLink
                name="instagram"
                value={socialMedia.instagram}
                Icon={AiOutlineInstagram}
                setSocials={setSocialMedia}
              />
              <SocialMediaLink
                name="youtube"
                value={socialMedia.youtube}
                Icon={AiOutlineYoutube}
                setSocials={setSocialMedia}
              />
              <SocialMediaLink
                name="linkedin"
                value={socialMedia.x}
                Icon={AiOutlineLinkedin}
                setSocials={setSocialMedia}
              />
              <hr />
            </form>
            <div className={styles.buttons}>
              <button type="reset" onClick={handleCancel}>
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleForm}
                disabled={handleDisabled()}
              >
                {isUpdating ? 'Updating...' : 'Change'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
