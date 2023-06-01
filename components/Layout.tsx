import React, { PropsWithChildren } from 'react'
import Navbar from './Navbar/Navbar'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='font-gothic'>
      <Navbar />
      {children}
      <div className='w-full border-t h-12 border-gray-100 flex justify-center items-center'>
        <p className='text-gray-300'>©2023 Tatsuya Sasaki</p>
      </div>
    </div>
  )
}

export default Layout
