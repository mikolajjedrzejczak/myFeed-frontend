import styles from './Post.module.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import purify from 'dompurify';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';


import { CommentProps } from '../../types/comments';
import CreateContent from '../../components/CreateContent/CreateContent';
import ShareModal from '../../components/ShareModal/ShareModal';
import Comments from '../../components/Comments/Comments';
import PostMedia from '../../components/PostMedia/PostMedia';

//icons
import { ChatBtn } from '../../components/Icons/ChatBtn';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoArrowBackSharp } from 'react-icons/io5';
import { FiRepeat } from 'react-icons/fi';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { AiFillEdit, AiOutlineUser } from 'react-icons/ai';
import { useAuth } from '../../context/Auth/AuthContext';
import { replaceMessage } from '../../utils/utlis';
import ImageToFullScreen from '../../components/Modals/ImageToFullScreenModal/ImageToFullScreenModal';
import PostLoading from '../../components/SkeletonLoading/PostLoading/PostLoading';
import { buttonVariants } from '../../animations/Animations';
import { OPTION_MODAL_POS } from '../../constants/constants';
import { EditPostModal } from '../../components/Modals/EditPostModal/EditPostModal';

const Post = () => {
  const { currentUser } = useAuth();
  const location = useLocation().pathname.split('/');
  const [showShare, setShowShare] = useState<boolean>(false);
  const [postLikes, setPostLikes] = useState<any>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [editPost, setEditPost] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [isNewComment, setIsNewComment] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showImageFull, setShowImageFull] = useState<boolean>(false);
  const postId = location[2];
  const navigate = useNavigate();

  const { data: post, isLoading: isPostLoading } = useFetch({
    baseURL: `/api/posts/${postId}`,
  });

  const handleShare = () => {
    setShowShare(true);
  };

  const message = replaceMessage(post?.description);

  const sendLike = async () => {
    try {
      await axios.post(`/api/likes/${postId}`);
      setLiked(true);
    } catch (err) {
      setLiked(false);
      console.log(err instanceof Error ? err.message : 'Unexpected error', err);
    }
  };

  const disLike = async () => {
    try {
      await axios.delete(`/api/likes/${postId}`);
      setLiked(false);
    } catch (err) {
      setLiked(true);
      console.log(err);
    }
  };

  useEffect(() => {
    const getLike = async () => {
      try {
        const { data } = await axios.get(`/api/likes/${postId}`);
        setLiked(data.length ? true : false);
      } catch (err) {
        console.log(err);
      }
    };
    getLike();
  }, [liked]);

  useEffect(() => {
    const getLikes = async () => {
      try {
        const { data } = await axios.get(`/api/likes/post/${postId}`);
        setPostLikes(data);
      } catch (err) {
        console.log(err);
      }
    };
    getLikes();
  }, [liked]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`/api/posts/post/comments/${postId}`);
        setComments(data);
        setIsNewComment(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [post?.id, isNewComment]);

  const handleImageToFullScreen = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLImageElement) {
      setShowImageFull(true);
    }
  };

  dayjs.extend(relativeTime);
  dayjs.extend(customParseFormat);
  return (
    <>
      {post && (
        <ImageToFullScreen
          media={post?.media}
          close={setShowImageFull}
          isActive={showImageFull}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
      {post && (
        <EditPostModal
          key={post?.id}
          close={setEditPost}
          isOpen={editPost}
          postId={post.id}
          postDesc={post?.description}
          postMedia={post?.media}
        />
      )}
      <div className={styles.post}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.backBtn}>
              <IoArrowBackSharp size={20} onClick={() => navigate(-1)} />
            </div>
            <h1>Post</h1>
          </div>
          <hr />
          {isPostLoading && <PostLoading />}
          {!isPostLoading && (
            <>
              <div className={styles.userInfo}>
                <Link
                  to={`/profile/${post?.username}`}
                  className={styles.userWrapper}
                >
                  <div className={styles.userImage}>
                    {post?.avatar ? (
                      <img src={post?.avatar} alt="" loading="lazy" />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        <AiOutlineUser />
                      </div>
                    )}
                  </div>
                  <span>{post?.name}</span>
                </Link>
                <div className={styles.infoRight}>
                  <div
                    className={styles.shareButton}
                    onMouseEnter={handleShare}
                    onMouseLeave={() => setShowShare(false)}
                  >
                    {showShare ? (
                      <ShareModal
                        url={`https://devdomain.site/profile/${post?.username}`}
                      />
                    ) : (
                      <BiDotsHorizontalRounded />
                    )}
                  </div>
                  {currentUser?.username == post?.username && (
                    <div
                      className={styles.editBtn}
                      onClick={() => setEditPost(true)}
                    >
                      <AiFillEdit />
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.postContent}>
                {post?.description && (
                  <p
                    className={styles.desc}
                    dangerouslySetInnerHTML={{
                      __html: purify.sanitize(message),
                    }}
                  />
                )}
                <div
                  className={styles.mediaContainer}
                  onClick={(e) => handleImageToFullScreen(e)}
                >
                  {post?.media.length > 0 &&
                    post?.media.map((m: any, index: number) => (
                      <PostMedia
                        key={m.id}
                        {...m}
                        setCurrentIndex={setCurrentIndex}
                        index={index}
                      />
                    ))}
                </div>
              </div>
              <hr />
              <div className={styles.postInfo}>
                <div className={styles.buttons}>
                  <div className={styles.buttonsWrapper}>
                    <div className={styles.heartBtn}>
                      <motion.div variants={buttonVariants} whileTap="tap">
                        {liked ? (
                          <FaHeart
                            className={`${styles.btn} ${styles.active}`}
                            onClick={disLike}
                          />
                        ) : (
                          <FaRegHeart
                            className={styles.btn}
                            onClick={sendLike}
                          />
                        )}
                      </motion.div>
                      <span>
                        {postLikes.length}
                      </span>
                    </div>
                    <div className={styles.chat}>
                      <ChatBtn className={styles.btn} />
                      <span>{comments.length}</span>
                    </div>
                    <div className={styles.repost}>
                      <FiRepeat className={styles.btn} />
                    </div>
                  </div>

                  <div className={styles.createdAt}>
                    {post?.updated_at ? (
                      <>
                        <div>updated</div>
                        {dayjs(post?.updated_at).format('DD/MM/YYYY HH:mm:ss')}
                      </>
                    ) : (
                      dayjs(post?.created_at).startOf('seconds').fromNow()
                    )}
                  </div>
                </div>
              </div>
              <hr />
              {currentUser?.id && (
                <CreateContent
                  comment
                  submitButtonTitle="comment"
                  optionModalPos={OPTION_MODAL_POS.top}
                />
              )}
              <div className={styles.comments}>
                {comments.length > 0 ? (
                  <Comments comments={comments} />
                ) : (
                  <p style={{ textAlign: 'center', paddingTop: '110px' }}>
                    <b>No Comments Yet!</b>
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
