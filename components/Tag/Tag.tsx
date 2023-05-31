import { TagType } from '@/lib/notionAPI'
import Link from 'next/link'
import React from 'react'

interface TagProps {
  tags: TagType[]
}

export const makeTagComponent = (i: number, tag: TagType) => {
  switch (tag.color) {
    case 'blue':
      return (
        <span className='text-white bg-blue-500 rounded px-2 py-1 hover:opacity-60'>
          {tag.name}
        </span>
      )
    case 'orange':
      return (
        <span className='text-white bg-orange-500 rounded px-2 py-1 hover:opacity-60'>
          {tag.name}
        </span>
      )
    case 'green':
      return (
        <span className='text-white bg-green-500 rounded px-2 py-1 hover:opacity-60'>
          {tag.name}
        </span>
      )
    case 'red':
      return (
        <span className='text-white bg-red-500 rounded px-2 py-1 hover:opacity-60'>{tag.name}</span>
      )
    case 'purple':
      return (
        <span className='text-white bg-purple-500 rounded px-2 py-1 hover:opacity-60'>
          {tag.name}
        </span>
      )
    case 'yellow':
      return (
        <span className='text-white bg-sky-500 rounded px-2 py-1 hover:opacity-60'>{tag.name}</span>
      )
    case 'pink':
      return (
        <span className='text-white bg-pink-500 rounded px-2 py-1 hover:opacity-60'>
          {tag.name}
        </span>
      )
    case 'gray':
      return (
        <span className='text-white bg-gray-500 rounded px-2 py-1 hover:opacity-60'>
          {tag.name}
        </span>
      )
    case 'brown':
      return (
        <span className='text-white bg-brown-500 rounded px-2 py-1 hover:opacity-60'>
          {tag.name}
        </span>
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
            <Link key={i} href={`/posts/tags/${tag.name}/pages/1`}>
              {makeTagComponent(i, tag)}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Tag
