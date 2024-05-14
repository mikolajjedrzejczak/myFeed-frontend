import { useAuth } from '../../context/Auth/AuthContext';
import styles from './Home.module.scss';

// Components
import CreateContent from '../../components/CreateContent/CreateContent';
import PageContent from '../../components/PageContent/PageContent';
import Trending from '../../components/Trending/Trending';


export const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className={`${styles.wrapper} ${styles.home}`}>
      <div className={styles.container}>
        {currentUser && <CreateContent submitButtonTitle="Submit" />}
        <PageContent />
      </div>
      <Trending />
    </div>
  );
};

export default Home;
