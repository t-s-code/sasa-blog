import { TagType } from './notionAPI'

export const getPageLink = (page: number, tag?: TagType) => {
  return tag ? `/posts/tags/${tag.name}/pages/${page}` : `/posts/pages/${page}`
}
