import React, { useEffect, useRef, useState } from 'react'
import { FaPlay,FaPause, FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import { useUserStore } from '../../store/useUserStore';



const MusicPlayer = () => {
    const{isPlaying,currentTrack,  isSelected,togglePlay,nextTrack,prevTrack}=useUserStore()
    const audioTrack =useRef(null)
    const [currnetTime ,setCurrentTime]= useState(0)
    const [duration ,setDuration]=useState(0)
    const formatTime=(seconds)=>{
      if (isNaN(seconds)) {
        return "00:00"
      }
      const min= Math.floor(seconds/60)
      const sec=Math.floor(seconds%60)
      return `${min}:${sec<10?"0":""}${sec}`
    }
    // console.log(currnetTime,duration)
    // console.log(audioTrack.current)
    // console.log(audioTrack)
    useEffect(()=>{
      if (!audioTrack.current) return;
      if (isPlaying) {
        audioTrack.current.play()
      }else{
        audioTrack.current.pause()
      }
    },[isPlaying,currentTrack])
    const handleSliderChange=(e)=>{
      const newTime=Number(e.target.value)

      setCurrentTime(newTime)
      audioTrack.current.currentTime=newTime

    }

    const handleVolumeChange=(e)=>{
      console.log(e.target.value)
      console.log(audioTrack.current.currentTime)
      audioTrack.current.volume=e.target.value
    }


  return (
      <>
       {currentTrack?(
      <div className='flex w-full items-center justify-between gap-4 text-white'>

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
              <input value={currnetTime} onChange={handleSliderChange} min={0} max={duration}  id='songs_duration' type='range' />
            {formatTime(currnetTime)}
            </div>

          </div>
          <div className=' text-white' id="volume-controls">
            <input step={'any'} min={0} defaultValue={1} max={1} onChange={handleVolumeChange} id='volume_range' type="range" />


          </div>



          <audio onLoadedMetadata={(e)=>{setDuration(e.target.duration)}} onTimeUpdate={(e)=>{setCurrentTime(e.target.currentTime)}} ref={audioTrack} hidden src={currentTrack.uri}></audio>

        </div>
        
      
      ): ( <p>Select a music to play....</p> ) } 
      </>
  
    
  

  )
}

export default MusicPlayer