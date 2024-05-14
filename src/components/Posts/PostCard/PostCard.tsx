import styles from './PostCard.module.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FiRepeat } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import axios from 'axios';
import purify from 'dompurify';

import ShareModal from '../../ShareModal/ShareModal';
import PostMedia from '../../PostMedia/PostMedia';
import { replaceMessage } from '../../../utils/utlis';
import { buttonVariants } from '../../../animations/Animations';
import { ChatBtn } from '../../Icons/ChatBtn';

const PostCard = ({ post }: any) => {
  const {
    media,
    avatar,
    name,
    username,
    description,
    created_at,
    id: postId,
  } = post;

  const [collapseContent, setCollapseContent] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);

  const sendLike = async () => {
    try {
      await axios.post(`/api/likes/${post.id}`);
      setLiked(true);
    } catch (err) {
      setLiked(false);
      console.log(err instanceof Error ? err.message : 'Unexpected error', err);
    }
  };

  const disLike = async () => {
    try {
      await axios.delete(`/api/likes/${post.id}`);
      setLiked(false);
    } catch (err) {
      setLiked(true);
      console.log(err);
    }
  };

  useEffect(() => {
    const getLike = async () => {
      try {
        const { data } = await axios.get(`/api/likes/${post?.id}`);
        setLiked(data.length ? true : false);
      } catch (err) {
        console.log(err);
      }
    };
    getLike();
  }, [liked]);



  const handleShare = () => {
    setShowShare(true);
  };

  const message = replaceMessage(description);

  dayjs.extend(relativeTime);
  dayjs.extend(customParseFormat);

  return (
    <AnimatePresence>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -20 },
        }}
        initial={{ y: 10, scale: 0.8, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.1 }}
        key={post.id}
        className={styles.singlePost}
      >
        <div className={styles.userInfo}>
          <Link to={`/profile/${username}`}>
            <div className={styles.userImage}>
              {avatar ? (
                <img src={avatar} alt="" />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  <AiOutlineUser />
                </div>
              )}
            </div>
            <span>{name}</span>
          </Link>
          <div
            className={styles.shareButton}
            onMouseEnter={handleShare}
            onMouseLeave={() => setShowShare(false)}
          >
            {showShare ? (
              <ShareModal url={`https://www.devdomain.site/post/${postId}`} />
            ) : (
              <BiDotsHorizontalRounded />
            )}
          </div>
        </div>
        <Link to={`/post/${postId}`} className={styles.content}>
          {description && description.length > 270 ? (
            <>
              {collapseContent ? (
                <p
                  className={styles.desc}
                  dangerouslySetInnerHTML={{ __html: message }}
                />
              ) : (
                <p
                  className={styles.desc}
                  dangerouslySetInnerHTML={{
                    __html: message.substring(0, 270),
                  }}
                />
              )}
              <span
                className="collapse-content"
                onClick={() => setCollapseContent((prev) => !prev)}
              >
                {collapseContent ? ' Read less' : ' Read more'}
              </span>
            </>
          ) : (
            <p
              className={styles.desc}
              dangerouslySetInnerHTML={{ __html: purify.sanitize(message) }}
            />
          )}
          <div className={styles.mediaContainer}>
            {media.length > 0 &&
              media.map((m: any) => <PostMedia key={m.id} {...m} />)}
          </div>
        </Link>
        <div className={styles.postInfo}>
          <div className={styles.buttons}>
            <div className={styles.buttonsLeft}>
              <div className={styles.heartBtn}>
                <motion.div variants={buttonVariants} whileTap="tap">
                  {liked ? (
                    <FaHeart
                      className={`${styles.btn} ${styles.active}`}
                      onClick={disLike}
                    />
                  ) : (
                    <FaRegHeart className={styles.btn} onClick={sendLike} />
                  )}
                </motion.div>
              </div>
              <div className={styles.chat}>
                <ChatBtn className={styles.btn} />
              </div>
              <div className={styles.chat}>
                <FiRepeat className={styles.btn} />
              </div>
            </div>
            <div className={styles.buttonsRight}>
              <div className={styles.createdAt}>
                {dayjs(created_at).startOf('seconds').fromNow()}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PostCard;
