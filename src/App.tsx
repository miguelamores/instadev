import { Routes, Route } from 'react-router-dom'
import SignIn from '@/auth/SignIn'
import SignUp from '@/auth/SignUp'
import AuthLayout from '@/auth/AuthLayout'
import useSession from '@/hooks/useSession'
import Home from '@/root/pages/Home'
import RootLayout from '@/root/RootLayout'
import Saved from '@/root/pages/Saved'
import CreatePost from '@/root/pages/CreatePost'
import Explore from './root/pages/Explore'
import People from './root/pages/People'
import { PostsContextProvider } from './context/PostsContext'
import { posts } from './services/appwrite'

function App() {
  useSession()

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Route>
      <Route element={<RootLayout />}>
        <Route
          path='/'
          element={
            <PostsContextProvider client={posts}>
              <Home />
            </PostsContextProvider>
          }
        />
        <Route path='/saved' element={<Saved />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/all-users' element={<People />} />
      </Route>
    </Routes>
  )
}

export default App
