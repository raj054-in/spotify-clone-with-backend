import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'


const RootLayout = () => {
    
  return (
    <div className='flex h-screen flex-col overflow-hidden bg-black'>
      <NavBar />
      <main className='flex-1 min-h-0 overflow-hidden'>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout