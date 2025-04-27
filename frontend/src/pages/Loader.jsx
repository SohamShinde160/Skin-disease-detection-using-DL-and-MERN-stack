import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <img 
        src="https://res.cloudinary.com/dxn7dggqk/image/upload/v1745753566/loader_mafisg.gif" 
        alt="Loading Process"
        className="w-24 h-24 md:w-32 md:h-32" 
      />
    </div>
  )
}

export default Loader;
