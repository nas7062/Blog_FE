import { createBrowserRouter } from 'react-router-dom'
import { DefaultLayout } from '../common/DefaultLayout'
import { RegisterPage } from '../pages/RegisterPage'
import { LoginPage } from '../pages/LoginPage'
import { CreatePost } from '../pages/CreatePost'
import { PostList } from '../pages/PostList'
import DetailPage from '../pages/DetailPage'
import EditPost from '../pages/EditPost'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <div>에러</div>,
    children: [
      {
        index: true,
        element: <PostList />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/createPost',
        element: <CreatePost />,
      },
      {
        path: '/detail/:postId',
        element: <DetailPage />,
      },
      {
        path: 'edit/:postId',
        element: <EditPost />,
      },
    ],
  },
])
