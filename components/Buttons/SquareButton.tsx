import tw, { css } from 'twin.macro'
import React from 'react'

interface SquareButton {
  className?: string
  title: string
  subTitle: string
}

const SquareButton = ({ className, title, subTitle }: SquareButton) => {
  return (
    <button
      tw='rounded px-16 py-1 hover:bg-gray-50 transition-colors'
      className={className}
      css={css`
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
      `}
    >
      <div tw='text-gray-300 text-xl tracking-widest'>{title}</div>
      <div tw='text-gray-200 text-xs'>{subTitle}</div>
    </button>
  )
}

export default SquareButton
