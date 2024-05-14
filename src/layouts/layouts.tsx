import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { ScrollToTop } from '../utils/utlis';
import Leftbar from '../components/LeftBar/Leftbar';
import MessageBox from '../components/MessageBox/MessageBox';

export const Layout = () => {
  return (
    <div className="app">
      <ScrollToTop />
      <Leftbar />
      <div className="wrapper">
        <Navbar />
        <Outlet />
      </div>
      <MessageBox />
    </div>
  );
};
