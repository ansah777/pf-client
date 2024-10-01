import { useState } from 'react'
import './bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Login from './pages/Login'
import Reg from './pages/Reg'
import Footer from './components/Footer'
import Auth from './pages/Auth'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer} from 'react-toastify'
import { TokenAuthContext } from './Context_Api/AuthContext'
import { useContext } from 'react'


function App() {

  const{authStatus,setAuthStatus}=useContext(TokenAuthContext)
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dash' element={authStatus?<Dashboard />:<Landing/>} />
        <Route path='/projects' element={authStatus?<Project />:<Landing/>} />
        <Route path='/log' element={<Login />} />
        <Route path='/reg' element={<Reg />} />
        <Route path='/auth' element={<Auth />} />

      </Routes>
      <Footer/>

      <ToastContainer/>
    </>
  )
}

export default App
