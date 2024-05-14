import { Outlet } from 'react-router-dom';
import SettingsLeftbar from '../../components/SettingsLeftbar/SettingsLeftbar';
import styles from './SettingsLayout.module.scss';

const SettingsLayout = () => {
  return (
    <div className={styles.settingsLayout}>
      <SettingsLeftbar />
      <Outlet />
    </div>
  );
};

export default SettingsLayout;
