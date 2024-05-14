import { AnimatePresence, motion } from 'framer-motion';

import styles from './ImageToFullScreenModal.module.scss';
import { useEffect } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import CloseButton from '../../CloseButton/CloseButton';

interface ImageToFullScreenModalProps {
  media: any;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
  currentIndex?: number;
  setCurrentIndex?: React.Dispatch<React.SetStateAction<number>>;
}

const ImageToFullScreenModal = ({
  media,
  close,
  isActive,
  currentIndex,
  setCurrentIndex,
}: ImageToFullScreenModalProps) => {
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isActive]);

  const nextSlide = () => {
    setCurrentIndex &&
      setCurrentIndex((prevIndex) =>
        prevIndex === media.length - 1 ? 0 : prevIndex + 1
      );
  };

  const prevSlide = () => {
    setCurrentIndex &&
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? media.length - 1 : prevIndex - 1
      );
  };

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          className={styles.imageToFull}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => close(false)}
        >
          <div className={styles.imageContainer}>
            <div className={styles.closeBtn}>
              <CloseButton handleClick={() => close(false)} />
            </div>
            <div
              className={styles.image}
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => e.preventDefault()}
            >
              {(media[currentIndex || 0].post_img ||
                media[currentIndex || 0].post_gif) && (
                <img
                  src={
                    media[currentIndex || 0].post_img ||
                    media[currentIndex || 0].post_gif
                  }
                  alt=""
                />
              )}
              {media[currentIndex || 0].post_video && (
                <video controls>
                  <source src={media[currentIndex || 0].post_video} />
                </video>
              )}
            </div>
            {media.length > 1 && (
              <>
                <div
                  className={`${styles.btn} ${styles.btnPrev}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                >
                  <RiArrowLeftSLine />
                </div>

                <div
                  className={`${styles.btn} ${styles.btnNext}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                >
                  <RiArrowRightSLine />
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageToFullScreenModal;
