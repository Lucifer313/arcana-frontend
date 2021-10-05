import React from 'react'
import dotenv from 'dotenv'
dotenv.config()
const Logo = ({ path }) => {
  return (
    <img
      src={process.env.REACT_APP_SERVER_URL + path}
      alt='Team logo'
      style={{ width: '50px', height: '50px' }}
    />
  )
}

export default Logo
