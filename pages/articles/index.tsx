import tw from 'twin.macro'
import SinglePost from '@/components/Post/SinglePost'
import Tag from '@/components/Tag/Tag'
import { NUMBER_OF_POSTS_PER_PAGE } from '@/constants/constants'
import { MyPost, TagType, getAllTags, getPostsForTopPage } from '@/lib/notionAPI'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

interface HomeProps {
  fourPosts: MyPost[]
  allTags: TagType[]
}

export default function ArticleIndex({ fourPosts, allTags }: HomeProps) {
  return (
    <div tw='h-full w-full mx-auto'>
      <Head>
        <title>Sasa Blog</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main tw='w-full px-56 mt-8'>
        <h1 tw='text-5xl font-medium text-gray-500 mb-10'>
          Articles
          <div tw='w-96 mt-3 border-b-2' />
        </h1>
        {fourPosts.map((post, i) => (
          <div key={i} tw='mt-24 min-w-min'>
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              genre={post.genre}
              thumbnail={post.thumbnail}
            />
          </div>
        ))}
        <div tw='mt-12 mb-6 w-full flex justify-end'>
          <Link href='posts/pages/1' tw='text-gray-500 hover:opacity-80 hover:underline'>
            ...もっと見る
          </Link>
        </div>
        <Tag tags={allTags} />
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(NUMBER_OF_POSTS_PER_PAGE)
  const allTags = await getAllTags()

  console.log(fourPosts)

  return {
    props: {
      fourPosts,
      allTags,
    },
    revalidate: 10,
  }
}
