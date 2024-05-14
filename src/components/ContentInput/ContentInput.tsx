import styles from './ContentInput.module.scss';
import CloseButton from '../CloseButton/CloseButton';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { MAX_SIZE } from '../../constants/constants';

interface ContentInputProps {
  text: string;
  images: any;
  gif: any;
  video: ArrayBuffer | string | null;
  placeholder?: string;
  setDesc: (value: React.SetStateAction<string>) => void;
  setMedia: React.Dispatch<any>;
  handleShowOption: () => void;
}

const ContentInput = ({
  text,
  images,
  gif,
  video,
  placeholder = "what's on your mind?",
  setDesc,
  setMedia,
  handleShowOption,
}: ContentInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const removeFile = (i: string, type: string) => {
    if (type === 'image') {
      setMedia((prevMedia: any) => [...prevMedia].filter((f) => f.id !== i));
    }
    if (type === 'gif') {
      setMedia((prevMedia: any) =>
        [...prevMedia].filter((f) => f.id !== i)
      );
    }
    if (type === 'video') {
      setMedia((prevMedia: any) =>
        [...prevMedia].filter((f) => f.previewURL !== i)
      );
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const items = e.clipboardData?.items;
    if (images.length > MAX_SIZE)
      return toast.info(`max amount of images is ${MAX_SIZE}!`);
    for (const item of items) {
      if (item.kind === 'file' && item.type.includes('image')) {
        const blob = item.getAsFile();
        const reader = new FileReader();
        const uniqueId = crypto.randomUUID();
        reader.onload = () => {
          setMedia((prevMedia: any) => [
            ...prevMedia,
            {
              id: uniqueId,
              file: blob,
              previewURL: reader.result,
              type: 'image',
            },
          ]);
        };
        reader.readAsDataURL(blob!);
      }
    }
  };

  return (
    <>
      <div className={styles.textInput}>
        <textarea
          name="text"
          className={text.length < 500 ? '' : styles.maxLength}
          placeholder={placeholder}
          value={text}
          maxLength={500}
          onChange={(e) => setDesc(e.target.value)}
          onFocus={handleShowOption}
          onPaste={handlePaste}
          ref={inputRef}
        ></textarea>
        <div className={styles.previewContainer}>
          <>
            {images.length > 0 &&
              images.map((file: any, index: number) => (
                <div className={styles.mediaPreview} key={index}>
                  <img src={file.previewURL} alt="" />
                  <div className={styles.closeBtn}>
                    <CloseButton
                      handleClick={() => removeFile(file.id, 'image')}
                    />
                  </div>
                </div>
              ))}
            {gif.length > 0 && (
              <div className={styles.mediaPreview}>
                <img src={gif[0].previewURL} alt="" />
                <div className={styles.closeBtn}>
                  <CloseButton
                    handleClick={() => removeFile(gif[0].id, 'gif')}
                  />
                </div>
              </div>
            )}
          </>

          {video && (
            <div className={styles.mediaPreview}>
              <video controls width={400} height={400}>
                <source src={video as string} type="video/mp4" />
              </video>
              <div className={styles.closeBtn}>
                <CloseButton
                  handleClick={() => removeFile(video as string, 'video')}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContentInput;
