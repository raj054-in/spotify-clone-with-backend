import React from 'react'
import { TextShow } from '../shared/TextShow'
import Search from '../shared/Search'
import SpotifyLogo from '../../assets/spotifyLogo/Spotify_Symbol_11.webp'
import { RxDividerVertical } from "react-icons/rx";
import { GoHomeFill } from "react-icons/go";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { useAuthStore } from '../../store/useAuthStore';
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';


const NavBar = () => {
  const navigate=useNavigate()
  const logOut=useAuthStore((state)=>state.logOut)
  const authUser=useAuthStore((state)=>state.authUser)
   function handleUploadClick(){
    if (authUser.role=='artist') {
      navigate('/studio')
      console.log("Hi")

      
    } else {
      toast("Artists can only acess studio")
      
    }
  }





  return (
    <nav className=' sticky top-0 z-50 bg-black  flex gap-3 items-center justify-between  text-white py-2 px-2.5'>
      
      <div className='flex items-center gap-3'>
        <img className=' w-8 h-8 cursor-pointer mr-2' src={SpotifyLogo} alt="" />
        
        
          <div className=' w-12 h-12 rounded-[50%] bg-neutral-900 flex justify-center items-center cursor-pointer hover:scale-105 '>
            <GoHomeFill className=' w-7.5 h-7.5 ' />
          </div>
          <Search className=" w-3xs"  search='bill joe' />
        
      </div>

      <div className='flex items-center gap-3'>
        <TextShow text='Premium'/>
        <TextShow text='Support'/>
        <TextShow text='Download'/>
        <RxDividerVertical className=' h-8 w-8'/>
        <TextShow  text='InstallApp'/>
        
        <div className=' py-3 px-7 rounded-4xl bg-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer'>
        <TextShow onClick={handleUploadClick}   text='Upload' hover="yes"  className='text-black hover:text-black'/>
        </div>
        <div className=' py-3 px-7 rounded-4xl bg-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer'>
        <TextShow onClick={logOut}  text='Log Out' hover="yes"  className='text-black hover:text-black'/>
        </div>
      </div>

    </nav>
  )
}

export default NavBar