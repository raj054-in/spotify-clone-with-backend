import React from 'react'
import { Link } from 'react-router-dom'

const MyAlbums = () => {
  return (
    <div>MyAlbums
        
        <Link to='/studio/create-album' > Create Album</Link>
    </div>
  )
}

export default MyAlbums