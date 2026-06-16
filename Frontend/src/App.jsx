import React, { useEffect } from 'react'
import { HomePage } from './pages/HomePage'
import { useAuthStore } from './store/useAuthStore'
import { Route,Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'


const App = () => {
  const getProfile=useAuthStore((state)=>state.checkAuth)
  const isCheckingAuth=useAuthStore((state)=>state.isCheckingAuth)
  const authUser=useAuthStore((state)=>state.authUser)
  useEffect(()=>{
    getProfile()
  },[])
  if (isCheckingAuth) {
    return <div>...loading</div>
    
  }
  return (
    <div >

      <Routes>
        <Route path='/' element={authUser?<HomePage/>:<SignupPage/>}/>
        <Route path='/login' element={authUser?<HomePage/>:<LoginPage/> }/>
        <Route path='/signup' element={authUser?<HomePage/>:<SignupPage/> }/>
      </Routes>
   
      

    </div>
  )
}

export default App