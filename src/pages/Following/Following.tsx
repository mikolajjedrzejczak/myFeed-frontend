import styles from './Following.module.scss';

// Components
import PageContent from '../../components/PageContent/PageContent';
import Trending from '../../components/Trending/Trending';
import { useAuth } from '../../context/Auth/AuthContext';

export const Following = () => {
  const { currentUser } = useAuth();

  return (
    <div className={`${styles.wrapper} ${styles.following}`}>
      <div className={styles.container}>
        <PageContent
          baseUrl="/api/posts/following"
          following
          currentUser={currentUser}
        />
      </div>
      <Trending />
    </div>
  );
};

export default Following ;
