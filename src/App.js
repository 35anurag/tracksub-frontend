import React from 'react'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import StreamingApp from './pages/StreamingApp'
import Login from './auth/Login'
import Signin from './auth/Signin'
import Navbar from './components/Navbar'
import AppDetail from './components/AppDetail'

const App = () => {
  return (
    <div className='flex flex-row'>
      <Router>
      <Navbar/>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/streamingApp' element={<StreamingApp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/streamingApp/:id' element={<AppDetail />} />
          <Route index element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App