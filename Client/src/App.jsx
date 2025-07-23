import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/HomePage'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import OwnerPage from './components/OwnerPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<><HomePage /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboared" element={<OwnerPage />} />

      </Routes>
    </>
  )
}

export default App
