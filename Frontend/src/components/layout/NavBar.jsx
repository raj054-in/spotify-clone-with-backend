import React from 'react'
import { TextShow } from '../shared/TextShow'
import Search from '../shared/Search'

const NavBar = () => {
  return (
    <div className=' flex'>
      <TextShow text='Premium'/>
      <Search search='bill joe' />
    </div>
  )
}

export default NavBar