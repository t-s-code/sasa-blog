import tw from 'twin.macro'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import Logo from '../Icons/Logo'
import useSubscribeDomeEvent from '../hooks/useSubscribeDomeEvent'
import Menu from './Menu'
import SquareButton from '../Buttons/SquareButton'
import { pagesPath } from '@/lib/$path'

export const NAVBAR_GLOBAL_HEIGHT = '116px'

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
    <nav
      tw='relative w-full mt-8 px-8 flex justify-between'
      style={{ height: NAVBAR_GLOBAL_HEIGHT }}
    >
      <div>
        <div
          ref={logoLinkRef}
          onMouseOver={() => setIsLogoOpen(true)}
          onMouseLeave={() => setIsLogoOpen(false)}
          onClick={toggleMenuOpen}
          tw='cursor-pointer w-14 h-10 flex items-center justify-center'
        >
          <Logo isOpen={isLogoOpen || isMenuOpen} />
        </div>
        <Menu isOpen={isMenuOpen} />
      </div>
      <div tw='py-8'>
        <Link href={pagesPath.articles.technology.pages._page('1').$url()}>
          <SquareButton tw=' mr-14' title='Technology' subTitle='テクノロジー' />
        </Link>
        <Link href={pagesPath.articles.design.pages._page('1').$url()}>
          <SquareButton tw='mr-14' title='Design' subTitle='デザイン' />
        </Link>
        <Link href={pagesPath.articles.society.pages._page('1').$url()}>
          <SquareButton title='Society' subTitle='社会性' />
        </Link>
      </div>
      <div tw='w-48' />
    </nav>
  )
}

export default Navbar
