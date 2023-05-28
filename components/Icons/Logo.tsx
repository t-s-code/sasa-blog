import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
  isOpen: boolean
}

const LOGO_CHANGE_DURATION = 0.2

const Logo = ({ className, isOpen }: LogoProps) => {
  const animations_hor = {
    visible: { scaleX: 1 },
    hidden: { scaleX: 0 },
  }
  const animations_ver = {
    visible: { scaleY: 1 },
    hidden: { scaleY: 0 },
  }

  return (
    <svg
      width='42'
      height='20'
      viewBox='0 0 42 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <motion.rect
        x='38'
        y='8'
        width='4'
        height='12'
        fill='#535353'
        variants={animations_ver}
        animate={isOpen ? 'visible' : 'hidden'}
        transition={{
          ease: 'linear',
          duration: LOGO_CHANGE_DURATION,
        }}
        style={{ originY: 1 }}
      />
      <motion.rect
        width='4'
        height='12'
        fill='#535353'
        variants={animations_ver}
        animate={isOpen ? 'visible' : 'hidden'}
        transition={{
          ease: 'linear',
          duration: LOGO_CHANGE_DURATION,
        }}
        style={{ originY: 0 }}
      />
      <motion.rect
        width='42'
        height='4'
        fill='#535353'
        variants={animations_hor}
        animate={isOpen ? 'visible' : 'hidden'}
        transition={{
          ease: 'linear',
          duration: LOGO_CHANGE_DURATION,
        }}
      />
      <motion.rect
        y='16'
        width='42'
        height='4'
        fill='#535353'
        variants={animations_hor}
        animate={isOpen ? 'visible' : 'hidden'}
        transition={{
          ease: 'linear',
          duration: LOGO_CHANGE_DURATION,
        }}
      />
      <motion.rect
        y='8'
        width='42'
        height='4'
        fill='#535353'
        variants={animations_hor}
        animate={isOpen ? 'visible' : 'hidden'}
        transition={{
          ease: 'linear',
          duration: LOGO_CHANGE_DURATION,
        }}
      />
      <motion.rect
        width='42'
        height='4'
        fill='#535353'
        variants={animations_hor}
        animate={isOpen ? 'visible' : 'hidden'}
        transition={{
          ease: 'linear',
          duration: LOGO_CHANGE_DURATION,
        }}
      />
      <motion.rect
        width='42'
        height='4'
        fill='#535353'
        variants={animations_hor}
        animate={isOpen ? 'hidden' : 'visible'}
        transition={{
          ease: 'linear',
          duration: LOGO_CHANGE_DURATION,
        }}
      />
      <motion.rect
        x='19'
        width='4'
        height='20'
        fill='#535353'
        variants={animations_ver}
        animate={isOpen ? 'hidden' : 'visible'}
        transition={{
          ease: 'linear',
          duration: LOGO_CHANGE_DURATION,
        }}
      />
    </svg>
  )
}

export default Logo
