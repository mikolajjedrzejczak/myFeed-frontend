import { OPTION_MODAL_POS } from '../constants/constants';

export interface PostProps {
  id: number;
  avatar?: string;
  post_img?: string;
  post_video?: string;
  post_gif?: string;
  name: string;
  username: string;
  desc?: string;
  file?: File;
  description?: string;
  user_id: number | string;
  likes?: number | null;
  created_at?: Date;
  updated_at?: Date;
  media: PostMediaProps[];
}

export interface CreatePostProps {
  comment?: boolean;
  parent_id?: any;
  border?: string;
  submitButtonTitle: string;
  optionModalPos?: OPTION_MODAL_POS;
}

export interface PostMediaProps {
  id: number;
  post_id: string;
  post_gif?: string;
  post_img?: string;
  post_video?: string;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}
