import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Layout } from './layouts/layouts';
import Following from './pages/Following/Following';
import Home from './pages/Home/Home';
import Post from './pages/Post/Post';
import Profile from './pages/Profile/Profile';
import { ProtectedRoute } from './utils/utlis';
import NotFound from './pages/404/NotFound';
import { useAuth } from './context/Auth/AuthContext';

const { currentUser } = useAuth();

export const router = createBrowserRouter([
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
      // {
      //   path: '/settings',
      //   element: <SettingsLayout />,
      //   children: [
      //     { path: '/settings/account', element: <Account /> },
      //     { path: '/settings/notifications', element: <Notifications /> },
      //     { path: '/settings/privacy', element: <Privacy /> },
      //     { path: '/settings/language', element: <Language /> },
      //   ],
      // },
    ],
  },
  {
    path: '/signin',
    element: currentUser ? <Navigate to={'/'} replace /> : <SignIn />,
  },
  {
    path: '/signup',
    element: currentUser ? <Navigate to={'/'} replace /> : <SignUp />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
