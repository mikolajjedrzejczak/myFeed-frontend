import { AiOutlineUser } from 'react-icons/ai';
import styles from './ProfilePic.module.scss';
import { useAuth } from '../../context/Auth/AuthContext';

const ProfilePic = () => {
  const { currentUser } = useAuth();
  return (
    <div className={styles.profilePic}>
      {currentUser?.avatar ? (
        <img src={currentUser?.avatar} alt="" />
      ) : (
        <div className={styles.avatarPlaceholder}>
          <AiOutlineUser />
        </div>
      )}
    </div>
  );
};

export default ProfilePic;
