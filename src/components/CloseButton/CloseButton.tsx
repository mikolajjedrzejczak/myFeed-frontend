import styles from './CloseButton.module.scss';
import { CloseBtn } from '../Icons/CloseBtn';

interface CloseButtonProps {
  handleClick: () => void;
}

const CloseButton = ({ handleClick }: CloseButtonProps) => {
  return (
    <div className={styles.closeButton} onClick={handleClick}>
      <CloseBtn />
    </div>
  );
};

export default CloseButton;
