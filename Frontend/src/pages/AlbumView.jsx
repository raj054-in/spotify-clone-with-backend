import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import MusicPlayer from '../components/layout/MusicPlayer'

const AlbumView = () => {
  const { albumId } = useParams()
  const { fetchingAlbumMusic, AlbumMusic, getAlbumsMusic, isPlaying, selectTrack,  setAlbumMode} = useUserStore()

  useEffect(() => {
    getAlbumsMusic(albumId)
  }, [albumId])

  console.log("these are album musics", AlbumMusic)

  if (fetchingAlbumMusic || !AlbumMusic) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center font-sans">
        <div className="text-zinc-400 font-semibold animate-pulse">Loading album...</div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans select-none relative pb-28">
      
      {/* 1. Album Banner / Header Section */}
      <div className="bg-linear-to-b from-red-900/70 via-red-950/40 to-zinc-950 p-6 md:p-8 flex flex-col md:flex-row items-center md:items-end gap-6">
        {/* Album Cover Image */}
        <img
          src={AlbumMusic.image}
          alt={AlbumMusic.title}
          className="w-48 h-48 md:w-56 md:h-56 rounded-md shadow-2xl object-cover shrink-0"
        />

        {/* Album Metadata */}
        <div className="flex flex-col gap-2 text-center md:text-left w-full">
          <span className="text-xs uppercase tracking-wider font-bold text-zinc-300">
            Album
          </span>
          <h1 className="text-3xl md:text-6xl font-black tracking-tight text-white">
            {AlbumMusic.title}
          </h1>
          <p className="text-sm font-medium text-zinc-300 mt-2">
            With <span className="text-white font-semibold">{AlbumMusic.artist.username}</span>
          </p>
          <div className="text-xs text-zinc-400 mt-1">
            <span>Spotify</span> • <span>{AlbumMusic.musics.length} songs</span>
          </div>
        </div>
      </div>

      {/* 2. Middle Action Bar */}
      <div className="px-6 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Big Green Play Button */}
          <button className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center hover:scale-105 active:scale-95 transition text-black shadow-lg">
            <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          {/* Shuffle Icon */}
          <button className="text-zinc-400 hover:text-white transition">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.45 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
            </svg>
          </button>

          {/* More (Three Dots) Option */}
          <button className="text-zinc-400 hover:text-white transition">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>

        {/* View Options (Right Side) */}
        <div className="flex items-center gap-2 text-zinc-400 text-sm font-semibold">
          <span>List</span>
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6s-.67-1.5-1.5-1.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
          </svg>
        </div>
      </div>

      {/* 3. Track List Section */}
      <div className="px-6 md:px-8 mt-2">
        {/* Table Header */}
        <div className="grid grid-cols-[16px_1fr_1fr] gap-4 px-4 py-2 border-b border-white/10 text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <span>#</span>
          <span>Title</span>
          <span>Album</span>
        </div>

        {/* Tracks Rows */}
        <div className="flex flex-col">
          {AlbumMusic.musics.map((track, index) => (
            <div
              key={track._id || index}
              className="grid grid-cols-[16px_1fr_1fr] gap-4 px-4 py-2.5 rounded-md hover:bg-white/10 group items-center text-sm cursor-pointer transition"

              onClick={()=>{
                selectTrack(track)
                setAlbumMode()
                }}
            >
              {/* # Index / Play Icon on Hover */}
              <div className="flex items-center justify-center">
                <span className="text-zinc-400 group-hover:hidden text-xs font-medium">
                  {index + 1}
                </span>
                <svg
                  className="w-4 h-4 fill-current text-white hidden group-hover:block"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              {/* Title + Music Cover Image + Artist */}
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={track.image}
                  alt={track.title}
                  className="w-10 h-10 rounded object-cover shrink-0"
                />
                <div className="flex flex-col truncate">
                  <span className="font-semibold text-white truncate">
                    {track.title}
                  </span>
                  <span className="text-xs text-zinc-400 group-hover:text-zinc-300 truncate">
                    {AlbumMusic.artist.username}
                  </span>
                </div>
              </div>

              {/* Album Title */}
              <div className="text-zinc-400 text-xs group-hover:text-zinc-300 truncate self-center">
                {AlbumMusic.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Spotify-Style Bottom Music Player */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-zinc-900/95 px-4 py-3 backdrop-blur-lg shadow-2xl">
        <MusicPlayer />
      </div>

    </div>
  );
}

export default AlbumView