import React, { useEffect } from 'react'
import  HomePage  from './pages/HomePage'
import { useAuthStore } from './store/useAuthStore'
import { Route,Routes,Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import StudioView from './pages/StudioView'
import NavBar from './components/layout/NavBar'
import RootLayout from './components/layout/RootLayout'
import MyMusic from './pages/studio/MyMusic'
import MyAlbums from './pages/studio/MyAlbums'
import UploadMusic from './pages/studio/UploadMusic'
import CreateAlbum from './pages/studio/createAlbum'



const App = () => {
  const getProfile=useAuthStore((state)=>state.checkAuth)
  const isCheckingAuth=useAuthStore((state)=>state.isCheckingAuth)
  const authUser=useAuthStore((state)=>state.authUser)
  let role 
  if(authUser) role=authUser.role
  
  useEffect(()=>{
    getProfile()
  },[])
  if (isCheckingAuth) {
    return <div>...loading</div>
    
  }
  return (
    <div >
      
      

      <Routes>
        
        <Route 
          path='/login' 
          element={!authUser ? <LoginPage /> : <Navigate to="/" />} 
        />
        <Route 
          path='/signup' 
          element={!authUser ? <SignupPage /> : <Navigate to="/" />} 
        />

       
        <Route element={authUser ? <RootLayout /> : <Navigate to="/login" />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/studio' element={<StudioView />} >
            <Route  path='my-music' element={<MyMusic/>}/>
            <Route path='my-albums' element={<MyAlbums/>}/>
            <Route path='upload-music' element= {<UploadMusic/>}/>
            <Route path='create-album' element ={<CreateAlbum/>}/>

          </Route>
        </Route>

        
        
      </Routes>
    </div>
  )
}

export default App