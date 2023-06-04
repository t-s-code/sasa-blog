import Pagination from '@/components/Pagination/Pagination'
import SinglePost from '@/components/Post/SinglePost'
import Tag from '@/components/Tag/Tag'
import {
  MyPost,
  TagType,
  getAllTags,
  getNumberOfPagesByGenre,
  getPostsByGenreAndPage,
} from '@/lib/notionAPI'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface SocialBlogListProps {
  postsByPage: MyPost[]
  numberOfPage: number
  allTags: TagType[]
}

const SocialBlogList = ({ postsByPage, numberOfPage, allTags }: SocialBlogListProps) => {
  const router = useRouter()
  const currentPage = router.query.page as number | undefined

  return (
    <div className='h-full w-full mx-auto'>
      <Head>
        <title>Sasa Blog</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='w-full px-56 mt-8'>
        <h1 className='text-5xl font-medium text-gray-500'>
          Society
          <div className='w-96 mt-3 border-b-2' />
        </h1>
        {postsByPage.map((post, i) => (
          <div key={i} className='mt-14 min-w-min'>
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
        <div className='mt-16'>
          <Pagination numberOfPage={numberOfPage} currentPage={currentPage} />
        </div>
        <Tag tags={allTags} />
      </main>
    </div>
  )
}

export default SocialBlogList

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page
  const postsByPage =
    typeof currentPage === 'string'
      ? await getPostsByGenreAndPage('Society', parseInt(currentPage.toString(), 10))
      : []
  const numberOfPage = await getNumberOfPagesByGenre('Society')
  const allTags = await getAllTags()

  return {
    props: {
      postsByPage,
      numberOfPage,
      allTags,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPage = await getNumberOfPagesByGenre('Society')
  let params = []
  for (let i = 0; i <= numberOfPage; i++) {
    params.push({ params: { page: i.toString() } })
  }

  return {
    paths: params,
    fallback: 'blocking',
  }
}
