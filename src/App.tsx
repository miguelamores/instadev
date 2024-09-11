import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
    </Routes>
  )
}

export default App
