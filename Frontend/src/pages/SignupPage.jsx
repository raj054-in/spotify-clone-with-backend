import React,{useState} from 'react'
import spotifyIcon from '../assets/spotifyLogo/spotify_icon_12.jpeg'
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';


const SignupPage = () => {
  const signUp=useAuthStore((state)=>state.signUp)
  const options = ["user", "artist"];
  const [isOpen, setIsOpen] = useState(false);
  const [form ,setForm]=useState({username:'',email:'',password:'',role:''})
  const handleSubmit=(e)=>{
    e.preventDefault()
    signUp(form)
  }

  const handleChange=(e)=>{
    const {name ,value}=e.target
    setForm(prev=>({...prev,[name]:value}))

  }
  console.log(form)
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-6 text-white bg-black'>
      <img src={spotifyIcon} className=' w-12 h-12' alt="" />
      <div id="spotifyHeadingText" className='flex flex-col justify-center items-center gap-2  font-spotify-circular text-5xl tracking-tighter'>
        <p>Sign up to</p>
        <p>start listening</p>
      </div>
      <form className=' relative flex flex-col gap-2' action="">
        <label className=' font-bold tracking-tight text-[14px] ' htmlFor="username_input">Username</label>
        <input name='username' onChange={handleChange} type='text' id='username_input' className='h-10 w-80 pl-1 pr-1 border-2 border-white rounded-md '/>
        <label className=' font-bold tracking-tight text-[14px] ' htmlFor="email_input">Email address</label>
        <input name='email' onChange={handleChange} type='email' id='email_input' className='h-10 w-82  pl-1 pr-1  border-2 border-white rounded-md '/>
        <label className=' font-bold tracking-tight text-[14px] ' htmlFor="password_input">Password</label>
        <input name='password' onChange={handleChange} type='password' id='password_input' className='h-10 w-82  pl-1 pr-1  border-2 border-white rounded-md'/>
        <div className="relative w-64">
      {/* Button Trigger */}
      <button
      type='button'
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black border border-gray-300 text-white py-2 px-4 rounded-lg flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-black"
      >
        <span>{form.role||"Select your role"}</span> 
        
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-black border border-gray-300 focus:outline-none rounded-lg shadow-lg">
          {options.map((opt, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-neutral-800 cursor-pointer text-white rounded-md"
              onClick={(e) => {
                e.stopPropagation()
                setForm((prev)=>({...prev ,role:opt}))
                // Handle selection
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
      <div>
      <button onClick={
      handleSubmit
      } 
      type='submit' id='sign_up_button' className='w-80 h-10 mt-2 bg-green-500 text-black rounded-xl tracking-tight font-bold
       hover:bg-green-400'>Sign Up</button>
      </div>

      <div id="login_navigate" className=' mt-6 w-full flex  flex-col justify-center '>
        
        <p className='relative left-13'>Already have an account?</p>
        <Link className=' relative left-28 font-bold text-green-500 hover:underline ' to='/login'>Log In</Link>
        
      </div>



    </div>
      </form>

    </div>
  )
}

export default SignupPage