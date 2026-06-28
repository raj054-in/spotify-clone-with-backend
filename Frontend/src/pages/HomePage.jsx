import React, { useEffect } from 'react'
import NavBar from '../components/layout/NavBar'
import Cards from '../components/shared/Cards'
import { useUserStore } from '../store/useUserStore'

 const HomePage = () => {
  const {fetchingMusic, getAllMusics}=useUserStore()
  const musics =useUserStore((state)=>state.musics)
 
  useEffect(()=>{
    getAllMusics()
  },[])
  console.log(musics)

  




  return (
    <div className=' bg-black text-white h-screen flex flex-col w-full'>
        
        <div className=' h-auto bg-linear-to-b from-neutral-700 to-black w-full rounded-lg bg-white '>

        <div className=' flex flex-col gap-6  mt-10 ml-10' id="trending_song_div">

          <div className=' flex justify-between mr-10'>
          <p className=' text-2xl font-bold cursor-pointer tracking-tight hover:underline'>Songs</p>
          <p className=' font-medium tracking-tight cursor-pointer hover:underline'>Show all</p>
          </div>

          <div className=' flex gap-8' >
            {
              musics.map((music)=>(
                <Cards key={music._id} image={music.image} title={music.title } />
              

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
          <Cards />
          </div>
        </div>

        </div>

    </div>
  )
}
export default HomePage