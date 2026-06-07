import React from 'react'
import { IoSearch } from "react-icons/io5";

const Search = (props) => {
  return (
<div className="relative w-full max-w-md">
      {/* Icon positioned absolutely on the left */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
        <IoSearch size={20} />
      </div>

      {/* Input with left padding to make room for the icon */}
      <input
        type="text"
        className="bg-neutral-800 w-full h-12 pl-12 pr-4 text-white rounded-4xl outline outline-neutral-700 outline-1 transition-all duration-400 ease-in-out focus:outline-white focus:outline-2 placeholder:text-neutral-500"
        placeholder="What do you want to Play?"
      />
    </div>
  ) 
}

export default Search