import tw from 'twin.macro'
import React, { PropsWithChildren } from 'react'
import Navbar from './Navbar/Navbar'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div tw='font-gothic'>
      <Navbar />
      {children}
      <div tw='w-full border-t h-12 border-gray-100 flex justify-center items-center'>
        <p tw='text-gray-300'>©2023 Tatsuya Sasaki</p>
      </div>
    </div>
  )
}

export default Layout
