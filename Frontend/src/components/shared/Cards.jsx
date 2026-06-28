import React from 'react';

const Card = ({ key,image, title, subtitle, type = 'song' }) => {
  return (
    <div key={key} className="w-48 p-4 bg-[#121212] hover:bg-[#1f1f1f] rounded-lg transition-colors duration-300 group cursor-pointer select-none">
      {/* Media Container */}
      <div className="relative mb-4">
        <img
          src={image}
          alt={title}
          className={`w-full aspect-square object-cover shadow-md ${
            type === 'artist' ? 'rounded-full' : 'rounded-md'
          }`}
        />
        
        {/* Play Button - Fades and slides up on parent hover */}
        <button 
          className="absolute bottom-2 right-2 bg-[#1ed760] hover:bg-[#1fdf64] w-12 h-12 rounded-full flex items-center justify-center shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out hover:scale-105 transform active:scale-95"
          aria-label={`Play ${title}`}
        >
          <svg className="w-7 h-7 text-black fill-current translate-x-0.5" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>

      {/* Text Meta Content */}
      <div className="overflow-hidden">
        <h3 className="text-white font-bold text-sm truncate mb-1 tracking-wide">
          {title}
        </h3>
        <p className="text-[#a7a7a7] text-xs truncate font-medium">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default Card;