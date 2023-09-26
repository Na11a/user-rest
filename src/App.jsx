import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Users from './Users'
import UserDetails from './UserDetails'


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
