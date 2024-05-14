import styles from './PostLoading.module.scss';

const PostLoading = () => {
  return (
    <div className={`${styles.loader} ${styles.skeletonPost}`}>
      <div className={styles.skeletonAvatar}></div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonHeader}></div>
        <div className={styles.skeletonText}></div>
      </div>
    </div>
  );
};

export default PostLoading;