import React from 'react'

const ImagePreview = ({ path, alternate }) => {
  return (
    <div style={{ width: '500px', height: '200px' }} className='mb-3'>
      <img
        src={path}
        alt={alternate}
        style={{ width: '500px', height: '200px' }}
      />
    </div>
  )
}

export default ImagePreview
