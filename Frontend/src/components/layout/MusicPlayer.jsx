import React, { useEffect, useRef } from 'react'
import { FaPlay,FaPause, FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import { useUserStore } from '../../store/useUserStore';



const MusicPlayer = () => {
    const{isPlaying,currentTrack,  isSelected,togglePlay,nextTrack,prevTrack}=useUserStore()
    const audioTrack =useRef(null)
    console.log(audioTrack.current)
    console.log(audioTrack)
    useEffect(()=>{
      if (!audioTrack.current) return;
      if (isPlaying) {
        audioTrack.current.play()
      }else{
        audioTrack.current.pause()
      }

    },[isPlaying,currentTrack])

    const handleVolumeChange=(e)=>{
      console.log(e.target.value)
      console.log(audioTrack.current.currentTime)
      audioTrack.current.volume=e.target.value
    }


  return (
      <>
       {currentTrack?(
        <div className=' flex justify-between'>

          <div id="songsInfo">
            <img className=' h-8 w-8' src={currentTrack.image} alt="" />
            <p>{currentTrack.title} </p>
          </div>

          <div className=' text-white' id="controls">
            <div className=' flex' id='control'>
            <FaBackwardStep onClick={prevTrack}/>
            <div onClick={togglePlay} id='play_paue'>
              {isPlaying? <FaPause/> :<FaPlay/>}
            </div>
            <FaForwardStep onClick={nextTrack}/>
            </div>

            <div id='duration'>
              <input  id='songs_range' type='range' />
            </div>

          </div>
          <div id="volume-controls">
            <input step={'any'} min={0} max={1} onChange={handleVolumeChange} id='volume_range' type="range" />


          </div>



          <audio ref={audioTrack}  src={currentTrack.uri}></audio>

        </div>
        
      
      ): ( <p>No music</p> ) } 
      </>
  
    
  

  )
}

export default MusicPlayer