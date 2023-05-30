import React, { PropsWithChildren } from 'react'
import Navbar from './Navbar/Navbar'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='font-gothic'>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
