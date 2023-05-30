import Link from 'next/link'
import React from 'react'

interface TagProps {
  tags: string[]
}

export const makeTagComponent = (i: number, tag: string) => {
  switch (i % 8) {
    case 0:
      return (
        <span className='text-white bg-blue-500 rounded px-2 py-1 hover:opacity-60'>{tag}</span>
      )
    case 1:
      return (
        <span className='text-white bg-orange-500 rounded px-2 py-1 hover:opacity-60'>{tag}</span>
      )
    case 2:
      return (
        <span className='text-white bg-green-500 rounded px-2 py-1 hover:opacity-60'>{tag}</span>
      )
    case 3:
      return <span className='text-white bg-red-500 rounded px-2 py-1 hover:opacity-60'>{tag}</span>
    case 4:
      return (
        <span className='text-white bg-purple-500 rounded px-2 py-1 hover:opacity-60'>{tag}</span>
      )
    case 5:
      return <span className='text-white bg-sky-500 rounded px-2 py-1 hover:opacity-60'>{tag}</span>
    case 6:
      return (
        <span className='text-white bg-pink-500 rounded px-2 py-1 hover:opacity-60'>{tag}</span>
      )
    case 7:
      return (
        <span className='text-white bg-gray-500 rounded px-2 py-1 hover:opacity-60'>{tag}</span>
      )
    default:
      return
  }
}

const Tag = ({ tags }: TagProps) => {
  return (
    <div className='mx-4 mb-12'>
      <section className='l'>
        <div className='font-medium mb-4'>タグ検索</div>
        <div className='flex flex-wrap gap-5'>
          {tags.map((tag, i) => (
            <Link key={i} href={`/posts/tags/${tag}/pages/1`}>
              {makeTagComponent(i, tag)}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Tag
