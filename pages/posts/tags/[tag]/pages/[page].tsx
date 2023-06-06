import tw from 'twin.macro'
import Pagination from '@/components/Pagination/Pagination'
import SinglePost from '@/components/Post/SinglePost'
import Tag from '@/components/Tag/Tag'
import {
  MyPost,
  TagType,
  getAllTags,
  getNumberOfPagesByTag,
  getPostsByTagAndPage,
} from '@/lib/notionAPI'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface BlogTagPageListProps {
  posts: MyPost[]
  numberOfPagesByTag: number
  tag: TagType
  allTags: TagType[]
}

const BlogTagPageList = ({ numberOfPagesByTag, posts, tag, allTags }: BlogTagPageListProps) => {
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
        <h1 tw='text-5xl font-medium text-gray-500 mb-10'>
          Articles
          <div tw='w-96 mt-3 border-b-2' />
        </h1>
        {posts &&
          posts.map((post, i) => (
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
        <div tw='mt-16'>
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
      return getNumberOfPagesByTag(tag.name).then((numberOfPagesByTag: number) => {
        for (let i = 0; i <= numberOfPagesByTag; i++) {
          params.push({ params: { tag: tag.name, page: i.toString() } })
        }
      })
    }),
  )

  return {
    paths: params,
    fallback: 'blocking',
  }
}
