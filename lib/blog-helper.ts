export const getPageLink = (page: number, tag?: string) => {
  return tag ? `/posts/tags/${tag}/pages/${page}` : `/posts/pages/${page}`
}