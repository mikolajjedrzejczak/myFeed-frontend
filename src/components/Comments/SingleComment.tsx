import styles from './Comments.module.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineGif } from 'react-icons/ai';
import dayjs from 'dayjs';
import axios from 'axios';
import ImageToFullScreen from '../Modals/ImageToFullScreenModal/ImageToFullScreenModal';
import PopUp from '../PopUp/PopUp';
import { useAuth } from '../../context/Auth/AuthContext';
import CreateContent from '../CreateContent/CreateContent';
import AddCommentButton from '../AddCommentButton/AddCommentButton';
import DeleteCommentButton from '../DeleteCommentButton/DeleteCommentButton';
import { OPTION_MODAL_POS } from '../../constants/constants';

export interface CommentsProps {
  userId?: string;
  userImg?: string;
  comment_gif?: string;
  comment_img?: string;
  parentId: string | number;
  replies?: any;
  name: string;
  desc: string;
  createdAt: string;
  toComment?: boolean;
  commentId?: (commentId: string | number) => void;
}

export const SingleComment = ({ comments, comment }: any) => {
  const childComments = comments.filter((c: any) => c.parentId === comment.id);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [contentExpand, setContentExpand] = useState(false);
  const [isReply, setIsReply] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(false);
  const [isImageActive, setIsImageActive] = useState(false);

  const deleteComment = async () => {
    try {
      await axios.post('/api/posts/comments/delete', { commentId: comment.id });
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  const canReply = Boolean(currentUser);
  const canDelete = currentUser?.username === comment.username;
  return (
    <>
      <PopUp
        title="Are you sure you want to delete this comment?"
        isActive={isActive}
        setIsActive={setIsActive}
        callback={deleteComment}
      />
      <ImageToFullScreen
        isActive={isImageActive}
        close={setIsImageActive}
        media={
          comment.comment_img
            ? [{ post_img: comment.comment_img }]
            : [{ post_img: comment.comment_gif }]
        }
      />
      <div className={styles.singleComment}>
        <div className={styles.userComment}>
          <Link
            to={`/profile/${comment.username}`}
            className={`${styles.userInfoComment} ${styles.link}`}
          >
            {comment.avatar ? (
              <img src={comment.avatar} alt="" />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <AiOutlineUser />
              </div>
            )}
            <div>{comment.name}</div>
          </Link>
        </div>
        {comment.description && (
          <p
            className={styles.comment}
            onClick={() => setContentExpand(!contentExpand)}
          >
            {comment.commentText?.length > 80
              ? contentExpand
                ? comment.description 
                : `${comment.description .slice(0, 80)}...`
              : comment.description }
          </p>
        )}
        {(comment.comment_img || comment.comment_gif) && (
          <div className={styles.media} onClick={() => setIsImageActive(true)}>
            <img src={comment.comment_img || comment.comment_gif} alt="" />
            {comment.comment_gif && (
              <div className="gifCap">
                <AiOutlineGif />
              </div>
            )}
          </div>
        )}
        <div className={styles.commentOptions}>
          <div>
            {canReply && (
              <div onClick={() => setIsReply((prev) => !prev)}>
                <AddCommentButton />
              </div>
            )}
            {canDelete && (
              <div onClick={() => setIsActive(true)}>
                <DeleteCommentButton />
              </div>
            )}
          </div>
          <div className={styles.createdAt}>
            {dayjs(comment.created_at).fromNow()}
          </div>
        </div>
        {isReply && (
          <CreateContent
            comment
            optionModalPos={OPTION_MODAL_POS.top}
            parent_id={comment.id}
            submitButtonTitle="comment"
          />
        )}

        <div className={styles.replies}>
          {childComments.map((childComment: any, index: any) => (
            <SingleComment
              key={index}
              comment={childComment}
              comments={comments}
            />
          ))}
        </div>
      </div>
    </>
  );
};
