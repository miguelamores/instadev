import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import SignIn from '@/auth/SignIn'
import SignUp from '@/auth/SignUp'
import AuthLayout from '@/auth/AuthLayout'
import Home from '@/root/pages/Home'
import RootLayout from '@/root/RootLayout'
import Saved from '@/root/pages/Saved'
import CreatePost from '@/root/pages/CreatePost'
import Explore from './root/pages/Explore'
import People from './root/pages/People'
import { PostsContextProvider } from './context/PostsContext'
import { getRecentPosts } from './services/appwrite'
import UpdatePost from '@/root/pages/UpdatePost'
import PostDetail from './root/pages/PostDetail'
import Profile from './root/pages/Profile'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Route>
      <Route element={<RootLayout />}>
        <Route
          path='/'
          element={
            <PostsContextProvider client={getRecentPosts}>
              <Home />
            </PostsContextProvider>
          }
        />
        <Route path='/profile' element={<Profile />} />
        <Route path='/saved' element={<Saved />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/all-users' element={<People />} />
        <Route path='/post/:postId/update' element={<UpdatePost />} />
        <Route path='/post/:postId' element={<PostDetail />} />
      </Route>
    </>
  )
)

function App() {
  // useSession()

  return <RouterProvider router={router} />
}

export default App
