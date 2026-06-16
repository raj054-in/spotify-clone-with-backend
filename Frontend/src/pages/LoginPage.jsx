import React, { useState } from 'react'
import spotifyIcon from '../assets/spotifyLogo/spotify_icon_12.jpeg'
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  // Accessing the login function from your auth store
  const logIn = useAuthStore((state) => state.logIn)
  
  // Login form state (Typically requires Email and Password)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    logIn(form)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  console.log(form)

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-6 text-white bg-black'>
      {/* Spotify Branding Icon */}
      <img src={spotifyIcon} className='w-12 h-12' alt="Spotify Icon" />
      
      {/* Spotify Heading Text styling matching your Signup page */}
      <div id="spotifyHeadingText" className='flex flex-col justify-center items-center gap-2 font-spotify-circular text-5xl tracking-tighter'>
        <p>Log in to</p>
        <p>Spotify</p>
      </div>

      {/* Consistent Form Layout */}
      <form onSubmit={handleSubmit} className='relative flex flex-col gap-2' action="">
        
        {/* Email Field */}
        <label className='font-bold tracking-tight text-[14px]' htmlFor="email_input">Email address</label>
        <input 
          name='email' 
          value={form.email}
          onChange={handleChange} 
          type='email' 
          id='email_input' 
          className='h-10 w-82 pl-1 pr-1 text-white border-2 border-white rounded-md'
          required
        />

        {/* Password Field */}
        <label className='font-bold tracking-tight text-[14px] mt-2' htmlFor="password_input">Password</label>
        <input 
          name='password' 
          value={form.password}
          onChange={handleChange} 
          type='password' 
          id='password_input' 
          className='h-10 w-82 pl-1 pr-1 text-white border-2 border-white rounded-md'
          required
        />

        {/* Submit Button Container */}
        <div className="w-82 mt-4">
          <button 
            type='submit' 
            id='log_in_button' 
            className='w-full h-10 bg-green-500 text-black rounded-xl tracking-tight font-bold hover:bg-green-400 transition-colors'
          >
            Log In
          </button>
        </div>

        {/* Navigation Redirection to Signup */}
        <div id="signup_navigate" className='mt-6 w-full flex flex-col justify-center items-center gap-1'>
          <p className='text-neutral-400 text-sm'>Don't have an account?</p>
          <Link className='font-bold hover:underline text-green-500' to='/signup'>
            Sign up for Spotify
          </Link>
        </div>

      </form>
    </div>
  )
}

export default LoginPage