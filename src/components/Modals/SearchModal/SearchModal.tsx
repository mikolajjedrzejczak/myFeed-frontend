import styles from './SearchModal.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { useEffect } from 'react';
import { CurrentUserProps } from '../../../types/user';
import { scaleVariants } from '../../../animations/Animations';
import CloseButton from '../../CloseButton/CloseButton';

interface SearchModalProps {
  users: CurrentUserProps[];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  showSearch: boolean;
}

const SearchModal = ({
  users,
  search,
  setSearch,
  setShowSearch,
  showSearch,
}: SearchModalProps) => {
  const userLength = users.length;
  useEffect(() => {
    if (showSearch) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showSearch]);
  return (
    <AnimatePresence mode="wait" onExitComplete={() => setShowSearch(false)}>
      {showSearch && (
        <div
          className={styles.searchModal}
          onClick={() => setShowSearch(false)}
        >
          <motion.div
            variants={scaleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.container}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.top}>
              <input
                type="text"
                placeholder="Search"
                className={styles.searchInput}
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
              <CloseButton handleClick={() => setShowSearch(false)} />
            </div>
            <hr />
            <ul className={styles.users}>
              {!userLength && <span>There is no such user.</span>}
              {userLength > 0 &&
                users.map((user: CurrentUserProps) => (
                  <li className={styles.user} key={user.id}>
                    <Link
                      to={`/profile/${user.username}`}
                      className={`${styles.link} ${styles.userInfo}`}
                      onClick={() => setShowSearch(false)}
                    >
                      {user.avatar ? (
                        <img src={user.avatar} alt="" />
                      ) : (
                        <div className={styles.avatarPlaceholder}>
                          <AiOutlineUser />
                        </div>
                      )}
                      <div>{user.name}</div>
                    </Link>
                    <hr />
                  </li>
                ))}
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
