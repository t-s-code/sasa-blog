import React from 'react'

interface SquareButton {
  className?: string
  title: string
  subTitle: string
}

const SquareButton = ({ className, title: contentEn, subTitle: contentJa }: SquareButton) => {
  return (
    <button id='SquareButton' className={'rounded px-16 py-1 hover:bg-gray-50 transition-colors  ' + className}>
      <div className='text-gray-300 text-xl'>{contentEn}</div>
      <div className='text-gray-200 text-xs'>{contentJa}</div>
    </button>
  )
}

export default SquareButton