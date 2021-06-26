import React from 'react'

const Logo = ({ path }) => {
  return (
    <img
      src={`http://localhost:7000/${path}`}
      alt='Team logo'
      style={{ width: '50px', height: '50px' }}
    />
  )
}

export default Logo
