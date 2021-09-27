import React from 'react'
import dotenv from 'dotenv'

const Logo = ({ path }) => {
  dotenv.config()

  return (
    <img
      src={`http://localhost:7000/${path}`}
      alt='Team logo'
      style={{ width: '50px', height: '50px' }}
    />
  )
}

export default Logo
