import { useEffect } from 'react';
import styles from './CreateContentModal.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import CreateContent from '../../CreateContent/CreateContent';

interface CreatePostModalProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
}

const CreateContentModal = ({ close, isActive }: CreatePostModalProps) => {
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isActive]);

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          className={styles.modalV1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => close(false)}
        >
          <div className={styles.container} onClick={(e) => e.preventDefault()}>
            <CreateContent border="border" submitButtonTitle="submit" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateContentModal;
