import React from 'react'
import { TextShow } from '../shared/TextShow'
import Search from '../shared/Search'
import SpotifyLogo from '../../assets/spotifyLogo/Spotify_Symbol_11.webp'
import { RxDividerVertical } from "react-icons/rx";
import { GoHomeFill } from "react-icons/go";
import { MdOutlineDownloadForOffline } from "react-icons/md";
const NavBar = () => {
  return (
    <div className=' flex gap-3 items-center justify-between  text-white py-2 px-2.5'>
      
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
        <TextShow text='Sign up'/>
        <div className=' py-3 px-7 rounded-4xl bg-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer'>
        <TextShow text='Log in' hover="yes" className='text-black hover:text-black'/>
        </div>
      </div>

    </div>
  )
}

export default NavBar