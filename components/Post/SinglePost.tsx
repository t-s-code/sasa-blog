import tw, { css } from 'twin.macro'
import { MyPost } from '@/lib/notionAPI'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { makeTagComponent } from '../Tag/Tag'

interface SinglePostProps extends Omit<MyPost, 'id'> {}

const SinglePost = (props: SinglePostProps) => {
  const { title, description, date, tags, slug, genre, thumbnail } = props

  return (
    <section tw='flex justify-center'>
      <Link
        href={`/posts/${slug}`}
        tw='w-[580px] h-[300px] min-w-min bg-gray-300 hover:opacity-90 hover:-translate-y-[3px] hover:-translate-x-0.5 hover:shadow-md transition-transform'
      >
        {/* <div tw='flex items-center justify-center min-w-[620px] w-[620px] h-[340px] rounded-lg border border-gray-50'>
          <div tw='relative min-w-[580px] w-[580px] h-[300px] rounded-lg overflow-hidden'>
            <Image
              src={thumbnail}
              alt='thumbnail'
              width={580}
              height={300}
              tw='object-cover min-w-[400px] h-[300px]'
            />
          </div>
          <div
            tw='absolute min-w-[620px] w-[620px] h-[340px] rounded-lg'
            css={css`
              box-shadow: inset 30px 30px 20px 5px rgba(0, 0, 0, 0.7);
            `}
          />
        </div> */}
        <div tw='overflow-hidden'>
          <Image
            src={thumbnail}
            alt='thumbnail'
            width={580}
            height={300}
            tw='object-cover min-w-[400px] h-[300px]'
          />
        </div>
      </Link>
      <div tw='w-[580px] ml-9 relative'>
        <div tw='flex flex-col gap-3'>
          <Link href={`/posts/${slug}`} tw='hover:opacity-60'>
            <h2 tw='text-2xl font-bold text-gray-400 truncate'>{title || 'No Title'}</h2>
          </Link>
          <div tw='text-gray-200 text-sm'>{date || 'No Date'}</div>
          <div tw=' flex items-center h-24'>
            <p tw='text-gray-400 line-clamp-4'>{description || 'No Description'}</p>
          </div>
          <div>
            {tags.length > 0 &&
              tags.map((tag, i) => (
                <Link key={i} href={`/posts/tags/${tag.name}/pages/1`} tw='mr-3'>
                  {makeTagComponent(i, tag)}
                </Link>
              ))}
          </div>
        </div>
        <div tw='absolute -bottom-2 right-0 text-gray-100 text-6xl'>{genre}</div>
      </div>
    </section>
  )
}

export default SinglePost
