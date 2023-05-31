import Link from 'next/link'
import React, { useRef, useState } from 'react'
import Logo from '../Icons/Logo'
import useSubscribeDomeEvent from '../hooks/useSubscribeDomeEvent'
import Menu from './Menu'
import SquareButton from '../Buttons/SquareButton'

const Navbar = () => {
  const [isLogoOpen, setIsLogoOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const logoLinkRef = useRef<HTMLDivElement>(null)

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useSubscribeDomeEvent({
    target: typeof document !== 'undefined' ? document : null,
    events: ['click'],
    listener: (e) => {
      if (e.target && logoLinkRef.current?.contains(e.target as Node)) {
        return
      }
      setIsLogoOpen(false)
      setIsMenuOpen(false)
    },
  })

  return (
    <nav className='relative w-full mt-8 px-8 flex justify-between'>
      <div>
        <div
          ref={logoLinkRef}
          onMouseOver={() => setIsLogoOpen(true)}
          onMouseLeave={() => setIsLogoOpen(false)}
          onClick={toggleMenuOpen}
          className='cursor-pointer w-[42px]'
        >
          <Logo isOpen={isLogoOpen || isMenuOpen} />
        </div>
        <Menu isOpen={isMenuOpen} />
      </div>
      <div className='py-8'>
        <SquareButton className=' mr-14' title='Technology' subTitle='テクノロジー' />
        <SquareButton className='mr-14' title='Design' subTitle='デザイン' />
        <SquareButton title='Society' subTitle='社会性' />
      </div>
      <div className='w-48' />
    </nav>
  )
}

export default Navbar
