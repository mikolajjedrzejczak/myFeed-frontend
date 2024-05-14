import styles from './AddCommentButton.module.scss';
import { CgMailReply } from 'react-icons/cg';

const AddCommentButton = () => {
  return (
    <div className={styles.addComment}>
      <CgMailReply />
    </div>
  );
};

export default AddCommentButton;
