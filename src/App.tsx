import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { Layout } from './layouts/layouts';
import Home from './pages/Home/Home';
import Following from './pages/Following/Following';
import Profile from './pages/Profile/Profile';
import Post from './pages/Post/Post';
import NotFound from './pages/404/NotFound';
import { useAuth } from './context/Auth/AuthContext';
import { ProtectedRoute } from './utils/utlis';
import Signin from './pages/Auth/Signin/Signin';
import Signup from './pages/Auth/Signup/Signup';
import SettingsLayout from './layouts/SettingsLayout/SettingsLayout';
import Account from './pages/Settings/Account/Account';
import Notifications from './pages/Settings/Notifications/Notifications';
import Privacy from './pages/Settings/Privacy/Privacy';
import Language from './pages/Settings/Language/Language';

const App = () => {
  const { currentUser } = useAuth();

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: '/', element: <Home /> },
        { path: '/following', element: <Following /> },
        { path: '/profile/:username', element: <Profile /> },
        { path: '/post/:postId', element: <Post /> },
        {
          path: '/settings',
          element: <SettingsLayout />,
          children: [
            { path: '/settings/account', element: <Account /> },
            { path: '/settings/notifications', element: <Notifications /> },
            { path: '/settings/privacy', element: <Privacy /> },
            { path: '/settings/language', element: <Language /> },
          ],
        },
      ],
    },
    {
      path: '/signin',
      element: currentUser ? <Navigate to={'/'} replace /> : <Signin />,
    },
    {
      path: '/signup',
      element: currentUser ? <Navigate to={'/'} replace /> : <Signup />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={true}
        closeOnClick={false}
        closeButton={false}
        pauseOnHover={false}
        draggable={true}
        theme="dark"
      />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
