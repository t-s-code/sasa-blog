import { getPageLink } from '@/lib/blog-helper'
import Link from 'next/link'
import React from 'react'

interface PaginationProps {
  numberOfPage: number
  currentPage?: number
  tag?: string
}

const Pagination = ({ numberOfPage, currentPage = -1, tag }: PaginationProps) => {
  let pages: number[] = []
  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i)
  }

  return (
    <section className='mx-auto rounded-md p-5'>
      <ul className='flex items-center justify-center gap-4'>
        {pages.map((page) => {
          return page == currentPage ? (
            <li className='border-gray-500 border rounded-lg w-6 h-8 relative'>
              <span className='text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
                {page}
              </span>
            </li>
          ) : (
            <Link key={page} href={getPageLink(page, tag)} className='hover:opacity-60'>
              <li className='bg-gray-100 rounded-lg w-6 h-8 relative'>
                <span className='text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
                  {page}
                </span>
              </li>
            </Link>
          )
        })}
      </ul>
    </section>
  )
}

export default Pagination
