import tw from 'twin.macro'
import Pagination from '@/components/Pagination/Pagination'
import SinglePost from '@/components/Post/SinglePost'
import Tag from '@/components/Tag/Tag'
import { MyPost, TagType, getAllTags, getNumberOfPages, getPostsByPage } from '@/lib/notionAPI'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface BlogPageListProps {
  postsByPage: MyPost[]
  numberOfPage: number
  allTags: TagType[]
}

const BlogPageList = ({ postsByPage, numberOfPage, allTags }: BlogPageListProps) => {
  const router = useRouter()
  const currentPage = router.query.page as number | undefined

  return (
    <div tw='h-full w-full mx-auto'>
      <Head>
        <title>Sasa Blog</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main tw='w-full px-56 mt-8'>
        <h1 tw='text-5xl font-medium text-gray-500'>
          Articles
          <div tw='w-96 mt-3 border-b-2' />
        </h1>
        {postsByPage.map((post, i) => (
          <div key={i} tw='mt-14 min-w-min'>
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
        <div tw='mt-16'>
          <Pagination numberOfPage={numberOfPage} currentPage={currentPage} />
        </div>
        <Tag tags={allTags} />
      </main>
    </div>
  )
}

export default BlogPageList

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page
  const postsByPage =
    typeof currentPage === 'string'
      ? await getPostsByPage(parseInt(currentPage.toString(), 10))
      : []
  const numberOfPage = await getNumberOfPages()
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
  const numberOfPage = await getNumberOfPages()
  let params = []
  for (let i = 0; i <= numberOfPage; i++) {
    params.push({ params: { page: i.toString() } })
  }

  return {
    paths: params,
    fallback: 'blocking',
  }
}
