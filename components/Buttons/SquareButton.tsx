import React, { PropsWithChildren } from 'react'

interface SquareButton {
  className?: string
  title: string
  subTitle: string
}

const SquareButton = ({ className, title: contentEn, subTitle: contentJa }: SquareButton) => {
  return (
    <button className={'shadow-md rounded px-16 py-1 ' + className}>
      <div>{contentEn}</div>
      <div>{contentJa}</div>
    </button>
  )
}

export default SquareButton