import styles from '../EditProfileModal.module.scss';
import { IconType } from 'react-icons';

interface SocialMediaLinkProps {
  name: string;
  value: string;
  Icon: IconType;
  setSocials: React.Dispatch<
    React.SetStateAction<{
      instagram: string;
      x: string;
      youtube: string;
    }>
  >;
}

const SocialMediaLink = ({
  name,
  value,
  setSocials,
  Icon,
}: SocialMediaLinkProps) => {
  const handleSocialMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <label className={styles.socialMedia}>
      <Icon size={25} />
      <input
        type="url"
        value={value}
        onChange={handleSocialMedia}
        name={name}
      />
    </label>
  );
};

export default SocialMediaLink;
