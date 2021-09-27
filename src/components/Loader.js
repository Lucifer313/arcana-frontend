import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner
      animation='border'
      variant='primary'
      className='my-3 mx-auto d-block'
      style={{ color: '#dcb570' }}
    />
  )
}

export default Loader
