import styles from './SubmitButton.module.scss';
import { FormEvent } from 'react';

interface SubmitButtonProps {
  isDisable: boolean;
  isCreating: boolean;
  title: string;
  handleSubmit: (e: FormEvent) => Promise<void>;
}

const SubmitButton = ({
  isDisable,
  isCreating,
  title,
  handleSubmit,
}: SubmitButtonProps) => {
  const handleButtonText = () => {
    if (isCreating) {
      return 'Publishing...';
    }

    return title;
  };
  return (
    <button
      className={styles.submitButton}
      onClick={handleSubmit}
      disabled={isDisable}
    >
      {handleButtonText()}
    </button>
  );
};

export default SubmitButton;
