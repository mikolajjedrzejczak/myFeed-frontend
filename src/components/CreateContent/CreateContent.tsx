import styles from './CreateContent.module.scss';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { EmojiClickData } from 'emoji-picker-react';
import { TenorImage } from 'gif-picker-react';

// icons

import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreatePostProps } from '../../types/post';
import AddFileButton from '../AddFileButton/AddFileButton';
import AddGifButton from '../AddGifButton/AddGifButton';
import AddEmojiButton from '../AddEmojiButton/AddEmojiButton';
import SubmitButton from '../SubmitButton/SubmitButton';
import ProfilePic from '../ProfilePic/ProfilePic';
import ContentInput from '../ContentInput/ContentInput';
import { MAX_SIZE, OPTION_MODAL_POS } from '../../constants/constants';

const CreateContent = ({
  comment,
  parent_id,
  border,
  submitButtonTitle,
  optionModalPos = OPTION_MODAL_POS.bottom,
}: CreatePostProps) => {
  const navigate = useNavigate();
  const postId = useLocation().pathname.split('/')[2];
  const [media, setMedia] = useState<any>([]);
  const [text, setDesc] = useState<string>('');
  const [showOption, setShowOption] = useState<boolean>(!comment);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [showGifs, setShowGifs] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleFile = (e: React.ChangeEvent<any>) => {
    const reader = new FileReader();
    if (media.length > MAX_SIZE)
      return toast.info(`max amount of images is ${MAX_SIZE}!`);
    for (let i = 0; i < e.target.files.length; i++) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          if (e.target.files[0].type.includes('video')) {
            setMedia([
              {
                id: crypto.randomUUID(),
                file: e.target.files[0],
                previewURL: reader.result,
                type: 'video',
              },
            ]);
            toast.info('Only one video file is allowed!');
            return;
          } else {
            setMedia((prevMedia: any) => [
              ...prevMedia,
              {
                id: crypto.randomUUID(),
                file: e.target.files[i],
                previewURL: reader.result,
                type: 'image',
              },
            ]);
          }
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const postMedia = media
    .filter((m: any) => m.type !== 'gif')
    .map((m: any) => m.file);
  const postImages = media.filter((m: any) => m.type === 'image');
  const postGifs = media.filter((m: any) => m.type === 'gif');
  const postVideo = media.filter((m: any) => m.type === 'video');

  const handleDisableSubmitButton = () => {
    return (
      (media.length === 0 && text.length === 0) ||
      !(text.length < 500) ||
      isCreating
    );
  };

  const publishPost = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      const data = new FormData();
      data.append('text', text);
      postMedia.forEach((postM: any) => {
        data.append('post', postM);
      });
      data.append('gif', postGifs.length > 0 ? postGifs[0].previewURL : '');
      data.append('parentId', parent_id);
      const headers = {
        'Content-Type': `${
          !postImages ? 'application/json' : 'multipart/form-data'
        }`,
      };

      const res = await axios.post(
        comment ? `/api/posts/post/comment/${postId}` : '/api/posts/create',
        data,
        {
          withCredentials: true,
          headers,
        }
      );

      toast.success(res.data.message);
      !comment ? navigate(`/post/${res.data.post_id}`) : navigate(0);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setIsCreating(false);
  };

  const handleEmoji = (emojiData: EmojiClickData) => {
    setDesc((prev) => prev + emojiData.emoji);
  };

  const handleGif = (gif: TenorImage) => {
    if (media.length > MAX_SIZE)
      return toast.info(`max amount of images is ${MAX_SIZE}!`);
    setMedia((prevMedia: any) => [
      ...prevMedia.filter((file: any) => file.type !== 'gif'),
      {
        id: crypto.randomUUID(),
        file: gif.url,
        previewURL: gif.url,
        type: 'gif',
      },
    ]); 
  };

  const handleShowOption = () => {
    if (comment) {
      setShowOption(true);
    }
  };

  return (
    <div
      className={`${styles.createPost} ${
        border === 'border' ? styles.border : undefined
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.top}>
        <ProfilePic />
        <ContentInput
          text={text}
          images={postImages}
          gif={postGifs}
          video={postVideo[0]?.previewURL}
          setDesc={setDesc}
          setMedia={setMedia}
          handleShowOption={handleShowOption}
          placeholder={comment ? 'comment' : "What's on your mind ?"}
        />
      </div>
      {showOption && (
        <>
          <span
            className={text.length < 500 ? styles.textLength : styles.maxLength}
          >
            {text ? text.length : 0} / 500
          </span>
          <div className={styles.options}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AddFileButton handleFile={handleFile} />
              <div
                onMouseEnter={() => setShowGifs(true)}
                onMouseLeave={() => setShowGifs(false)}
              >
                <AddGifButton
                  handleGif={handleGif}
                  showGif={showGifs}
                  position={optionModalPos}
                />
              </div>
              <div
                onMouseEnter={() => setShowEmoji(true)}
                onMouseLeave={() => setShowEmoji(false)}
              >
                <AddEmojiButton
                  handleEmoji={handleEmoji}
                  showEmoji={showEmoji}
                  position={optionModalPos}
                />
              </div>
            </div>
            <SubmitButton
              isDisable={handleDisableSubmitButton()}
              isCreating={isCreating}
              title={submitButtonTitle}
              handleSubmit={publishPost}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CreateContent;
