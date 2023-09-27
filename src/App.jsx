import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Users from './components/Users'
import UserDetails from './components/UserDetails'


function App() { 

  return (
      <Routes>
        <Route path="/" element={<Navigate to='/users' />} />
        <Route path='/users' element={<Users />} />
        <Route path='/edit/:id' element={<UserDetails />}/>
      </Routes>      
  )
}

export default App
