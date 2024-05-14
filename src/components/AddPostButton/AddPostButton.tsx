import { PlusBtn } from '../Icons/PlusBtn';
import styles from './AddPostButton.module.scss';

interface AddPostButtonProps {
  addPost: boolean;
  setAddPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPostButton = ({ addPost, setAddPost }: AddPostButtonProps) => {
  return (
    <div className={styles.addPostBtn} onClick={() => setAddPost(!addPost)}>
      <div className={styles.wrapper}>
        <PlusBtn />
      </div>
    </div>
  );
};

export default AddPostButton;
