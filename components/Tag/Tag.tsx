import Link from 'next/link'
import React from 'react'

interface TagProps {
  tags: string[]
}

const Tag = ({ tags }: TagProps) => {
  return (
    <div className='mx-4'>
      <section className='lg:w-1/2 mb-8 mx-auto bg-gray-400 rounded-md p-5 shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-150'>
        <div className='font-medium mb-4'>タグ検索</div>
        <div className='flex flex-wrap gap-5'>
          {tags.map((tag, i) => (
          <Link key={i} href={`/posts/tags/${tag}/pages/1`}>
            <span className='cursor-pointer px-2 rounded-xl bg-black inline-block text-white'>{tag}</span>
          </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Tag