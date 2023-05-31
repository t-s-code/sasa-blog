import { Client } from '@notionhq/client'
import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { SelectPropertyResponse } from 'notionhq'
import { NotionToMarkdown } from 'notion-to-md'
import { NUMBER_OF_POSTS_PER_PAGE } from '@/constants/constants'

export type Post = PageObjectResponse | PartialPageObjectResponse

export type MyPost = {
  id: string
  title: string
  description: string
  date: string
  slug: string
  tags: Array<TagType>
  genre: string
  thumbnail: string
}

export type TagType = {
  name: string
  color: TagColor
}

type TagColor =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const n2m = new NotionToMarkdown({ notionClient: notion })

export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || '',
    page_size: 100,
    filter: {
      property: 'published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'date',
        direction: 'descending',
      },
    ],
  })

  const allPosts = posts.results

  return allPosts.map((post) => {
    return getPageMetaData(post)
  })
}

const getPageMetaData = (post: Post): MyPost | undefined => {
  const getTags = (tags: Array<SelectPropertyResponse>) => {
    const allTags = tags.map((tag) => {
      return {
        name: tag.name,
        color: tag.color,
      }
    })

    return allTags
  }

  const getThumbnailUrl = (post: Post) => {
    if (!('cover' in post)) return
    return post.cover?.type === 'file'
      ? post.cover.file.url
      : post.cover?.type === 'external'
      ? post.cover.external.url
      : ''
  }

  if (
    'properties' in post &&
    post.properties.name.type === 'title' &&
    post.properties.description.type === 'rich_text' &&
    post.properties.date.type === 'date' &&
    post.properties.slug.type === 'rich_text' &&
    post.properties.tags.type === 'multi_select' &&
    post.properties.genre.type === 'select'
  ) {
    return {
      id: post.id,
      title: post.properties.name.title[0]?.plain_text || '',
      description: post.properties.description.rich_text[0]?.plain_text || '',
      date: post.properties.date.date?.start || '',
      slug: post.properties.slug.rich_text[0]?.plain_text || '',
      tags: getTags(post.properties.tags.multi_select),
      genre: post.properties.genre.select?.name || '',
      thumbnail: getThumbnailUrl(post) || '',
    }
  } else {
    return undefined
  }
}

export const getSinglePost = async (slug: string) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || '',
    filter: {
      property: 'slug',
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  })

  const page = response.results[0]
  const metadata = getPageMetaData(page)
  const mdBlocks = await n2m.pageToMarkdown(page.id)
  const mdString = n2m.toMarkdownString(mdBlocks)

  return {
    metadata,
    markdown: mdString.parent,
  }
}

/* Topページ用記事の取得 */
export const getPostsForTopPage = async (pageSize = NUMBER_OF_POSTS_PER_PAGE) => {
  const allPosts = await getAllPosts()
  const fourPosts = allPosts.slice(0, pageSize)
  return fourPosts
}

/* ページ番号に応じた記事の取得 */
export const getPostsByPage = async (page: number) => {
  const allPosts = await getAllPosts()

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE

  return allPosts.slice(startIndex, endIndex)
}

export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts()

  return (
    Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  )
}

export const getPostsByTagAndPage = async (tagName: string, page: number) => {
  const allPosts = await getAllPosts()
  const posts = allPosts.filter((post) => post?.tags.find((tag) => tag.name === tagName))

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE

  return posts.slice(startIndex, endIndex)
}

export const getNumberOfPagesByTag = async (tagName: string) => {
  const allPosts = await getAllPosts()
  const posts = allPosts.filter((post) => post?.tags.find((tag) => tag.name === tagName))

  return (
    Math.floor(posts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (posts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  )
}

export const getAllTags = async () => {
  const allPosts = await getAllPosts()

  const allTagsDuplicatedList = allPosts.flatMap((post) => post?.tags)
  const allTags = Array.from(new Map(allTagsDuplicatedList.map((tag) => [tag?.name, tag])).values())

  return allTags
}
