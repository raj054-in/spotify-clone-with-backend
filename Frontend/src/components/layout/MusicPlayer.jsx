import React, { useEffect, useRef, useState } from 'react';
import { 
  FaPlay, 
  FaPause, 
  FaForwardStep, 
  FaBackwardStep, 
  FaVolumeHigh, 
  FaVolumeLow, 
  FaVolumeXmark 
} from "react-icons/fa6";
import { useUserStore } from '../../store/useUserStore';

const MusicPlayer = () => {
  const { isPlaying, currentTrack, togglePlay, nextTrack, prevTrack } = useUserStore();
  const audioTrack = useRef(null);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Helper to safely extract artist name whether it's an object or a string
  const getArtistName = (artist) => {
    if (!artist) return "Unknown Artist";
    if (typeof artist === 'object') {
      return artist.username || artist.name || artist.email || "Unknown Artist";
    }
    return artist;
  };

  // Format time in mm:ss format
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds <= 0) return "00:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // Sync Play / Pause state with Audio element
  useEffect(() => {
    if (!audioTrack.current) return;

    if (isPlaying) {
      const playPromise = audioTrack.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => console.log("Playback interrupted:", error));
      }
    } else {
      audioTrack.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // Handle seek slider change
  const handleSliderChange = (e) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioTrack.current) {
      audioTrack.current.currentTime = newTime;
    }
  };

  // Handle volume slider change
  const handleVolumeChange = (e) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (audioTrack.current) {
      audioTrack.current.volume = newVol;
    }
  };

  // Toggle Mute / Unmute
  const toggleMute = () => {
    if (!audioTrack.current) return;
    if (isMuted) {
      const restoredVol = volume || 0.5;
      audioTrack.current.volume = restoredVol;
      setIsMuted(false);
    } else {
      audioTrack.current.volume = 0;
      setIsMuted(true);
    }
  };

  if (!currentTrack) return null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-zinc-950 border-t border-zinc-800/80 px-4 text-white flex items-center justify-between shadow-2xl">
      
      {/* 1. Track Metadata (Left Section) */}
      <div className="flex items-center gap-3 w-1/4 min-w-45">
        <img 
          src={currentTrack.image || "/placeholder.png"} 
          alt={currentTrack.title || "Track"} 
          className="h-14 w-14 rounded object-cover shadow-md"
        />
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-medium truncate text-white hover:underline cursor-pointer">
            {currentTrack.title || "Unknown Track"}
          </span>
          <span className="text-xs text-zinc-400 truncate hover:underline cursor-pointer">
            {getArtistName(currentTrack.artist)}
          </span>
        </div>
      </div>

      {/* 2. Controls & Seek Bar (Center Section) */}
      <div className="flex flex-col items-center gap-2 w-2/4 max-w-2xl px-4">
        {/* Buttons */}
        <div className="flex items-center gap-6">
          <button 
            onClick={prevTrack} 
            className="text-zinc-400 hover:text-white transition cursor-pointer text-lg"
            title="Previous Track"
          >
            <FaBackwardStep />
          </button>

          <button 
            onClick={togglePlay} 
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition cursor-pointer"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause className="text-sm" /> : <FaPlay className="text-sm ml-0.5" />}
          </button>

          <button 
            onClick={nextTrack} 
            className="text-zinc-400 hover:text-white transition cursor-pointer text-lg"
            title="Next Track"
          >
            <FaForwardStep />
          </button>
        </div>

        {/* Progress Seek Bar */}
        <div className="flex items-center gap-2 w-full text-xs text-zinc-400 font-mono">
          <span className="w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSliderChange}
            className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400 transition"
          />
          <span className="w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* 3. Volume Control (Right Section) */}
      <div className="flex items-center justify-end gap-2 w-1/4 min-w-37.5">
        <button 
          onClick={toggleMute} 
          className="text-zinc-400 hover:text-white transition text-sm cursor-pointer"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted || volume === 0 ? (
            <FaVolumeXmark />
          ) : volume < 0.5 ? (
            <FaVolumeLow />
          ) : (
            <FaVolumeHigh />
          )}
        </button>
        
        <input
          type="range"
          min={0}
          max={1}
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400 transition"
        />
      </div>

      {/* Hidden Audio Tag */}
      <audio
        ref={audioTrack}
        src={currentTrack.uri}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onEnded={nextTrack}
        hidden
      />
    </footer>
  );
};

export default MusicPlayer;