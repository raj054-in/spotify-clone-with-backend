import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import coverimagesong from '../../assets/userProfile/coverimagesong.webp'
import { useArtistStore } from '../../store/useArtistStore'
const MyMusic = () => {
  const artistsMusicFetching=useArtistStore((state)=>state.artistMusicFetching)
  const getArtistsMusic=useArtistStore((state)=>state.getArtistsMusic)
  const artistsMusic=useArtistStore((state)=>state.artistMusic)


  useEffect(()=>{
     getArtistsMusic()

  },[])

  if(artistsMusicFetching){
    return(
      <div>loading...</div>
    )
  }
  return (
    // i need to display all the music of that artist here 
    <div className=' flex flex-col p-5 gap-3'>
      <div className=' w-full flex justify-center items-center'>
        <p className=' font-spotify-circular text-4xl
        '>Your Musics</p>
      </div>

      <div className='flex flex-col max-h-130 overflow-y-auto no-scrollbar gap-3'>
      {
        artistsMusic.map((music,index)=>(
        <div key={index} className=' h-20 items-center p-2 w-full bg-neutral-400 rounded-lg flex gap-5'>
          <img src={music.image} className=' rounded-md h-16 w-16 object-cover shadow-xl shadow-neutral-900' alt="" />
          <div>
          <p className=' font-spotify-circular text-2xl'>{music.title} </p>
          </div>
        </div>   
        ))
      } 

      </div>
      <div className=' w-full flex justify-center items-center '>

        <button className=' bg-white text-black font-spotify-circular rounded-md p-1.5'>
        <Link to='/studio/upload-music'>Upload Music</Link>
        </button>

      </div>

    </div>
  )
}

export default MyMusic