export interface CurrentUserProps {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string;
  profile_img?: string;
  location?: string;
  bio?: string;
  x_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  created_at: Date;
}

export interface User {
  id: number;
  name: string;
  username: string;
  avatar?: string;
}
