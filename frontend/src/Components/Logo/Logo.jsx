// React
import React from 'react'

// Import da Logo
import Parallel from '../../img/Logo Parallel 50.png'

const Logo = ({height, width}) => {
  return (
    <img src = {Parallel} alt = "Logo Parallel" height = {height} width={width}/>
  )
}

export default Logo