import React from 'react'
import Person1 from '../assets/userProfile/person1.jpg'
import { Outlet,Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const StudioView = () => {
    
  const { authUser}=useAuthStore()
  

  return (
    <div className='text-white flex h-full w-full gap-2 bg-black'>
     <div id="sidebar" className='h-full w-[25%] rounded-lg bg-neutral-800'  >
      <div id="artist" className='border-b-2 pb-2 border-white flex gap-2 items-center pl-2 pt-2'>
        
        <p className=' font-spotify-circular'>{authUser.username}  </p>
      </div>
      
      <div className=' flex flex-col gap-4 mt-3 ml-3' id='links'>
    
        <Link className=' hover:underline' to='/studio/my-music' >My Music</Link>
        <Link className=' hover:underline' to='/studio/my-albums'>My Album</Link>
      </div>



     </div>


      <main className='w-full overflow-hidden rounded-lg bg-linear-to-b from-neutral-700 to-black'>
        <Outlet/>
      </main>
    </div>
  )
}

export default StudioView