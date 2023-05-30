import { MyPost } from '@/lib/notionAPI'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { makeTagComponent } from '../Tag/Tag'

interface SinglePostProps extends Omit<MyPost, 'id'> {
  isPaginationPage: boolean
}

const SinglePost = (props: SinglePostProps) => {
  const { title, description, date, tags, slug, genre, thumbnail, isPaginationPage } = props

  return isPaginationPage ? (
    <section className=''>
      <div className='lg:flex items-center'>
        <Link href={`/posts/${slug}`}>
          <h2 className='text-2xl font-medium mb-2'>{title || 'No Title'}</h2>
        </Link>
        <div className='mr-2'>{date || 'No Date'}</div>
        {tags.length > 0 &&
          tags.map((tag, i) => (
            <Link key={i} href={`posts/tags/${tag}/pages/1`}>
              <span className='text-white bg-black rounded-xl px-2 mr-2'>{tag}</span>
            </Link>
          ))}
      </div>
      <p>{description || 'No Description'}</p>
    </section>
  ) : (
    <section className='flex justify-center'>
      <Link
        href={`/posts/${slug}`}
        className='w-[580px] h-[300px] min-w-min bg-gray-300 hover:opacity-90 hover:-translate-y-[3px] hover:-translate-x-0.5 hover:shadow-md transition-transform'
      >
        <Image
          src={thumbnail}
          alt='thumbnail'
          width={580}
          height={300}
          className='object-cover min-w-[400px] h-[300px]'
        />
      </Link>
      <div className='w-[580px] ml-9 relative'>
        <div className='flex flex-col gap-3'>
          <Link href={`/posts/${slug}`} className='hover:opacity-60'>
            <h2 className='text-2xl font-bold text-gray-400 truncate'>{title || 'No Title'}</h2>
          </Link>
          <div className='text-gray-200 text-sm'>{date || 'No Date'}</div>
          <div className=' flex items-center h-24'>
            <p className='text-gray-400 line-clamp-4'>{description || 'No Description'}</p>
          </div>
          <div>
            {tags.length > 0 &&
              tags.map((tag, i) => (
                <Link key={i} href={`posts/tags/${tag}/pages/1`} className='mr-3'>
                  {makeTagComponent(i, tag)}
                </Link>
              ))}
          </div>
        </div>
        <div className='absolute -bottom-2 right-0 text-gray-100 text-6xl'>{genre}</div>
      </div>
    </section>
  )
}

export default SinglePost
