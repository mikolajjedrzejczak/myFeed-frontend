import styles from './BurgerButton.module.scss';
import leftBar from '../LeftBar/Leftbar.module.scss';

// icons
import { RxHamburgerMenu } from 'react-icons/rx';
import { RiCloseFill } from 'react-icons/ri';
import { useMenu } from '../../context/Menu/MenuContext';

const BurgerButton = () => {
  const { showMenu, changeMenu } = useMenu();
  return (
    <div className={styles.burger}>
      {showMenu !== leftBar.active ? (
        <RxHamburgerMenu
          className={styles.burgerIcon}
          onClick={() => changeMenu(leftBar.active)}
        />
      ) : (
        <RiCloseFill
          className={styles.burgerIcon}
          onClick={() => changeMenu('')}
        />
      )}
    </div>
  );
};

export default BurgerButton;
