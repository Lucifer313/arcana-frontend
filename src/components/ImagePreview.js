import React from 'react'

const ImagePreview = ({ path, alternate }) => {
  return (
    <div style={{ height: '200px' }} className='mb-3'>
      <img
        src={path}
        alt={alternate}
        style={{ height: '200px', width: '100%' }}
      />
    </div>
  )
}

export default ImagePreview
