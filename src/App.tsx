import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import AuthLayout from './auth/AuthLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App
