import styles from './AddGifButton.module.scss';
import { GifBtn } from '../Icons/GifBtn';
import GifPicker, { TenorImage } from 'gif-picker-react';
import { Theme } from 'emoji-picker-react';
import { OPTION_MODAL_POS } from '../../constants/constants';

interface AddGifButtonProps {
  handleGif: (gif: TenorImage) => void;
  showGif: boolean;
  position: OPTION_MODAL_POS;
}

const AddGifButton = ({
  handleGif,
  showGif,
  position = OPTION_MODAL_POS.bottom,
}: AddGifButtonProps) => {
  return (
    <div className={styles.addGif}>
      <GifBtn />
      {showGif && (
        <div
          className={
            position === OPTION_MODAL_POS.bottom
              ? styles.modalBottom
              : styles.modalTop
          }
        >
          <GifPicker
            tenorApiKey={import.meta.env.VITE_TENOR_KEY}
            theme={Theme.DARK}
            onGifClick={handleGif}
            width={275}
            height={300}
          />
        </div>
      )}
    </div>
  );
};

export default AddGifButton;
