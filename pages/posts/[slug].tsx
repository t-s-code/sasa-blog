import tw, { css } from 'twin.macro'
import { TagType, getAllPosts, getSinglePost } from '@/lib/notionAPI'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Tag from '@/components/Tag/Tag'

type SlugPageProps = InferGetStaticPropsType<typeof getStaticProps>

const Post = ({ post }: SlugPageProps) => {
  const markdownStyle = [
    css`
      h1 {
        ${tw`text-4xl font-bold mt-8 mb-3`}
      }
      h2 {
        ${tw`text-3xl font-bold mt-8 mb-3`}
      }
      h3 {
        ${tw`text-2xl font-bold mt-8 mb-3`}
      }
      h4 {
        ${tw`text-xl font-bold mt-8 mb-3`}
      }
      h5 {
        ${tw`text-lg font-bold mt-8 mb-3`}
      }
      ul > li {
        &::before {
          content: '・';
        }
      }
      hr {
        ${tw`my-10`}
      }
      pre {
        ${tw`mb-6`}
      }
      img {
        ${tw`mb-6`}
      }
      p {
        ${tw`mt-6`}
      }
    `,
  ]

  return (
    <section tw='container lg:px-2 px-5 h-full mx-auto mt-20'>
      <h2 tw='w-full text-2xl font-medium'>{post.metadata?.title}</h2>
      <div tw='border-b-2 w-1/3 mt-1 border-black' />
      <div tw='mt-1'>
        <span tw='text-gray-500'>Posted at {post.metadata?.date}</span>
      </div>
      <Tag tags={post.metadata?.tags || []} search={false} tw='mt-3' />
      <div tw='mt-10 font-medium' css={[markdownStyle]}>
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter {...props} style={vscDarkPlus} language={match[1]} PreTag='div'>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              )
            },
          }}
        >
          {post.markdown}
        </ReactMarkdown>
        <div tw='mt-3 pb-10 text-blue-700 underline text-sm'>
          <Link href='/'>←ホームに戻る</Link>
        </div>
      </div>
    </section>
  )
}

export default Post

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params?.slug || typeof params.slug !== 'string') return
  const post = await getSinglePost(params.slug)

  return {
    props: {
      post,
    },
    revalidate: 10,
  }
}

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts()
  const paths = allPosts
    .filter((post) => post?.slug !== undefined && post.slug !== '')
    .map((post) => ({
      params: { slug: post ? post.slug : '' },
    }))

  return {
    paths,
    fallback: 'blocking',
  }
}
