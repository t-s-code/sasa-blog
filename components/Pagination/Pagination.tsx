import tw from 'twin.macro'
import { getPageLink } from '@/lib/blog-helper'
import { TagType } from '@/lib/notionAPI'
import Link from 'next/link'
import React from 'react'

interface PaginationProps {
  numberOfPage: number
  currentPage?: number
  tag?: TagType
}

const Pagination = ({ numberOfPage, currentPage = -1, tag }: PaginationProps) => {
  let pages: number[] = []
  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i)
  }

  return (
    <section tw='mx-auto rounded-md p-5'>
      <ul tw='flex items-center justify-center gap-4'>
        {pages.map((page) => {
          return page == currentPage ? (
            <li key={page} tw='border-gray-500 border rounded-lg w-6 h-8 relative'>
              <span tw='text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
                {page}
              </span>
            </li>
          ) : (
            <Link key={page} href={getPageLink(page, tag)} tw='hover:opacity-60'>
              <li tw='bg-gray-100 rounded-lg w-6 h-8 relative'>
                <span tw='text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
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
