import styles from './DeleteCommentButton.module.scss';
import { RiDeleteBin6Line } from 'react-icons/ri';

const DeleteCommentButton = () => {
  return (
    <div className={styles.deleteComment}>
      <RiDeleteBin6Line />
    </div>
  );
};

export default DeleteCommentButton;
