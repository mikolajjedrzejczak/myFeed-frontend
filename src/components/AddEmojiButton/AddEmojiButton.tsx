import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { EmojiBtn } from '../Icons/EmojiBtn';
import styles from './AddEmojiButton.module.scss';
import { OPTION_MODAL_POS } from '../../constants/constants';

interface AddEmojiButtonProps {
  handleEmoji: (emojiData: EmojiClickData) => void;
  showEmoji: boolean;
  position: OPTION_MODAL_POS;
}

const AddEmojiButton = ({
  handleEmoji,
  showEmoji,
  position,
}: AddEmojiButtonProps) => {
  return (
    <div className={styles.addEmoji}>
      <EmojiBtn />
      {showEmoji && (
        <div
          className={
            position === OPTION_MODAL_POS.bottom
              ? styles.modalBottom
              : styles.modalTop
          }
        >
          <EmojiPicker
            previewConfig={{ showPreview: false }}
            theme={Theme.DARK}
            onEmojiClick={handleEmoji}
            width={275}
            height={300}
          />
        </div>
      )}
    </div>
  );
};

export default AddEmojiButton;
