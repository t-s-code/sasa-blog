import Pagination from '@/components/Pagination/Pagination'
import SinglePost from '@/components/Post/SinglePost'
import Tag from '@/components/Tag/Tag'
import { MyPost, getAllTags, getNumberOfPagesByTag, getPostsByTagAndPage } from '@/lib/notionAPI'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface BlogTagPageListProps {
  posts: MyPost[]
  numberOfPagesByTag: number
  tag: string
  allTags: string[]
}

const BlogTagPageList = ({ numberOfPagesByTag, posts, tag, allTags }: BlogTagPageListProps) => {
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
          Articles
          <div className='w-96 mt-3 border-b-2' />
        </h1>
        {posts &&
          posts.map((post, i) => (
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
          <Pagination numberOfPage={numberOfPagesByTag} currentPage={currentPage} tag={tag} />
        </div>
        <Tag tags={allTags} />
      </main>
    </div>
  )
}

export default BlogTagPageList

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page?.toString()
  const currentTag = context.params?.tag?.toString()
  const posts = await getPostsByTagAndPage(currentTag || '', parseInt(currentPage || '0', 10))
  const allTags = await getAllTags()

  const numberOfPagesByTag = await getNumberOfPagesByTag(currentTag || '')

  return {
    props: {
      posts,
      numberOfPagesByTag,
      tag: currentTag,
      allTags,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = await getAllTags()
  let params: { params: { tag: string; page: string } }[] = []

  await Promise.all(
    allTags.map((tag) => {
      if (!tag) return
      return getNumberOfPagesByTag(tag).then((numberOfPagesByTag: number) => {
        for (let i = 0; i <= numberOfPagesByTag; i++) {
          params.push({ params: { tag: tag, page: i.toString() } })
        }
      })
    }),
  )

  return {
    paths: params,
    fallback: 'blocking',
  }
}
