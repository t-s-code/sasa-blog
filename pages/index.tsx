import SinglePost from '@/components/Post/SinglePost'
import Tag from '@/components/Tag/Tag'
import { NUMBER_OF_POSTS_PER_PAGE } from '@/constants/constants'
import { MyPost, getAllTags, getPostsForTopPage } from '@/lib/notionAPI'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

interface HomeProps {
  fourPosts: MyPost[]
  allTags: string[]
}

export default function Home({ fourPosts, allTags }: HomeProps) {
  return (
    <div className='h-full w-full mx-auto'>
      <Head>
        <title>Sasa Blog</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='w-full px-56 mt-8'>
        <h1 className='text-5xl font-medium text-gray-500'>
          Articles
          <div className='w-96 mt-3 border-b-2' />
        </h1>
        {fourPosts.map((post, i) => (
          <div key={i} className='mt-14 min-w-min'>
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPaginationPage={false}
              genre={post.genre}
              thumbnail={post.thumbnail}
            />
          </div>
        ))}
        <div className='mt-12 mb-6 w-full flex justify-end'>
          <Link href='posts/pages/1' className='text-gray-500 hover:opacity-80 hover:underline'>
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
