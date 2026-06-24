import React from 'react'
import Person1 from '../assets/userProfile/person1.jpg'
import { Outlet,Link } from 'react-router-dom'

const StudioView = () => {
  return (
    <div className=' text-white flex gap-2  bg-black h-screen w-full'>
     <div id="sidebar" className=' w-[25%]  h-screen bg-neutral-800 rounded-lg '  >
      <div id="artist" className='border-b-2 pb-2 border-white flex gap-2 items-center pl-2 pt-2'>
        <img className=' object-cover object-center rounded-[50%] h-8 w8' src={Person1} alt="" />
        <p>Artist's Name</p>
      </div>
      
      <div className=' flex flex-col' id='links'>
    
        <Link to='/studio/my-music'>My Music</Link>
        <Link to='/studio/my-albums'>My Album</Link>
      </div>



     </div>


      <main className=' bg-linear-to-b from-neutral-700 to-black rounded-lg w-full'>
        <Outlet/>
      </main>
    </div>
  )
}

export default StudioView