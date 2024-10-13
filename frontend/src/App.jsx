import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'

function App() {
  

  return (
    <>
    <Navbar/>

     <Routes>
     <Route  path='/' element={<Home/>}/>
     <Route  path='/login' element={<Login/>}/>
     <Route path='/signup' element={<Signup/>}/>
     <Route path='/userProfile' element={<UserProfile/>}/>
     </Routes>
    </>
  )
}

export default App
