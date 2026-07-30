import React, { useEffect } from 'react'
import NavBar from '../components/layout/NavBar'
import Cards from '../components/shared/Cards'
import { useUserStore } from '../store/useUserStore'
import MusicPlayer from '../components/layout/MusicPlayer'

 const HomePage = () => {
  const {fetchingMusic, getAllMusics,currentTrack}=useUserStore()
  const {fetchingAlbum,getAllAlbum,Albums}=useUserStore()
  const musics =useUserStore((state)=>state.musics)
  console.log('this is current track :',currentTrack)
 
  useEffect(()=>{
    getAllMusics()
    getAllAlbum()
  },[])
  console.log(musics)
  console.log("these are all the albusm",  Albums)
  
  return (
    <div className='flex h-full w-full flex-col overflow-hidden bg-black text-white'>
        
      <div className='flex-1 overflow-y-auto no-scrollbar rounded-lg bg-linear-to-b from-neutral-700 to-black w-full'>

        <div className=' flex flex-col gap-6  mt-10 ml-10' id="trending_song_div">

          <div className=' flex justify-between mr-10'>
          <p className=' text-2xl font-bold cursor-pointer tracking-tight hover:underline'>Songs</p>
          <p className=' font-medium tracking-tight cursor-pointer hover:underline'>Show all</p>
          </div>

          <div className=' flex gap-8' >
            {
              musics.map((music)=>(
                <Cards id={music._id} image={music.image} title={music.title } track={music} subtitle={music.artist.username} type='song'  />
              ))
            }
          </div>
        </div>  
        <div className='flex flex-col gap-6  mt-10 ml-10' id="trending_song_div">
          <div className=' flex justify-between mr-10'>
          <p className=' text-2xl font-bold cursor-pointer tracking-tight hover:underline'>Albums</p>
          <p className=' font-medium tracking-tight cursor-pointer hover:underline'>Show all</p>
          </div>

          <div className=' flex gap-8'>
            {
              Albums.map((album)=>(
                <Cards id={album._id} image={album.image} title={album.title} subtitle={album.artist.username} type='album' />
              ))
            }
          
          </div>
        </div>
        </div>
        <div className='shrink-0 border-t border-white/10 bg-black/90 px-4 py-3 backdrop-blur-md'>
          <MusicPlayer />
        </div>

    </div>
  )
}
export default HomePage