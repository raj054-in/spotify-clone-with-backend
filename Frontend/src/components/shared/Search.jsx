import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { axiosInstance } from '../../util/axiosInstance';

const debounce=(func , delay )=>{
  let timeoutId
  return(...args)=>{
    clearTimeout(timeoutId)
    timeoutId=setTimeout(() => {
      func(...args)
    }, delay);

  }
}
const Search = (props) => {
  const [searchQuery , setSearchQuery ]=useState('')
  const [searchResults, setSearchResult]=useState(null)
  const handleSearch = useCallback(
    debounce( async (query)=>{
      if (!query.trim()) {
        setSearchResult(null)
        return
        
      }
   
      try {
        const res = await axiosInstance.get(`/search?q=${query}`)
        setSearchResult(res.data.data)
        console.log(res.data.data)
      
    } catch (error) {
      console.log(error)
      
    }
    

  },500)
  ,[])
  return (
    <div className="relative group 125">
      {/* Icon positioned absolutely on the left */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 cursor-default">
        <IoSearch className="  transition-all duration-200 ease-in-out hover:scale-110 group-hover:text-white" size={28} />
      </div>

      {/* Input with left padding to make room for the icon */}
      <input
        type="text"
        className="bg-neutral-900 w-full h-12 pl-12 pr-4 text-white rounded-4xl outline-neutral-700 outline-1 transition-all duration-400 ease-in-out focus:outline-white focus:outline-2 placeholder:text-neutral-400 group-hover:bg-neutral-800"
        placeholder="What do you want to play?"
        value={searchQuery}
        onChange={(e)=>{
          setSearchQuery(e.target.value)
          handleSearch(e.target.value)
        }}
      />
    </div>
  ) 
}

export default Search