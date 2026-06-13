import React from 'react'

export const TextShow = ({ text, className,hover }) => {
  return (
    <div className={`font-bold ${hover||"hover:scale-105"} cursor-pointer ${className || 'text-neutral-400 hover:text-white'}`} >
        {text}
    </div>
  )
}
 