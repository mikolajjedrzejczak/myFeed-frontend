import styles from './AvatarLoading.module.scss';

const AvatarLoading = () => {
  return (
    <div
      className={`${styles.loader} ${styles.skeletonPost} ${styles.friends}`}
    >
      <div className={styles.skeletonAvatar}></div>
    </div>
  );
};

export default AvatarLoading;
