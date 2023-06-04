import React, { useState } from 'react'

interface InfoIconProps {
  className?: string
}

const InfoIcon = ({ className }: InfoIconProps) => {
  return (
    <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='9' cy='9' r='8.5' stroke='#65D2FE' />
      <circle cx='9' cy='4.5' r='1.6875' fill='#65D2FE' />
      <path
        d='M10.6875 11.25C10.6875 15.75 9.93198 15.75 9 15.75C8.06802 15.75 7.3125 15.75 7.3125 11.25C7.3125 6.74996 8.06802 6.75 9 6.75C9.93198 6.75 10.6875 6.75 10.6875 11.25Z'
        fill='#65D2FE'
      />
    </svg>
  )
}

export default InfoIcon
