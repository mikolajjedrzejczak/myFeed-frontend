import { FileBtn } from '../Icons/FileBtn';
import styles from './AddFileButton.module.scss';

interface AddFileButtonProps {
  handleFile: (e: React.ChangeEvent<any>) => any | undefined;
}

const AddFileButton = ({ handleFile }: AddFileButtonProps) => {
  return (
    <div className={styles.addMedia}>
      <label htmlFor="img-input">
        <FileBtn />
      </label>
      <input
        type="file"
        id="img-input"
        className="uploadFile"
        name="images"
        accept="*"
        onChange={handleFile}
        multiple
      />
    </div>
  );
};

export default AddFileButton;
