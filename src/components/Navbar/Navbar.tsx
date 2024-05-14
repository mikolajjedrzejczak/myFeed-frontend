import styles from './Navbar.module.scss';
import leftBar from '../LeftBar/Leftbar.module.scss';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Icons

import { CurrentUserProps } from '../../types/user';
import { useAuth } from '../../context/Auth/AuthContext';
import SearchBar from '../SearchBar/SearchBar';
import AddPostButton from '../AddPostButton/AddPostButton';
import BurgerButton from '../BurgerButton/BurgerButton';
import CreateContentModal from '../Modals/CreateContentModal/CreateContentModal';
import SearchModal from '../Modals/SearchModal/SearchModal';
import { useMenu } from '../../context/Menu/MenuContext';

const Navbar = () => {
  const [addPost, setAddPost] = useState<boolean>(false);
  const [users, setUsers] = useState<CurrentUserProps[]>([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const { changeMenu, showMenu } = useMenu();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`/api/users/filter?q=${search}`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [search]);

  const handleBrand = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <>
      <CreateContentModal close={setAddPost} isActive={addPost} />
      <div className={styles.navWrapper}>
        <SearchModal
          search={search.toLowerCase()}
          setSearch={setSearch}
          users={users}
          setShowSearch={setShowSearch}
          showSearch={showSearch}
        />
        <div className={styles.nav} onClick={(e) => e.stopPropagation()}>
          <div className={styles.leftSide}>
            <h1 onClick={() => changeMenu('')}>
              <NavLink to="/" onClick={handleBrand}>
                <span>My</span>Feed
              </NavLink>
            </h1>
            <BurgerButton />
          </div>
          <div className={styles.buttons}>
            <SearchBar
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              search={search}
              setSearch={setSearch}
            />
            {currentUser && (
              <AddPostButton addPost={addPost} setAddPost={setAddPost} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
