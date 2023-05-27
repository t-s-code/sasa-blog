export const pagesPath = {
  "about": {
    $url: (url?: { hash?: string }) => ({ pathname: '/about' as const, hash: url?.hash })
  },
  "articles": {
    $url: (url?: { hash?: string }) => ({ pathname: '/articles' as const, hash: url?.hash })
  },
  "posts": {
    _slug: (slug: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/posts/[slug]' as const, query: { slug }, hash: url?.hash })
    }),
    "pages": {
      _page: (page: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/posts/pages/[page]' as const, query: { page }, hash: url?.hash })
      })
    },
    "tags": {
      _tag: (tag: string | number) => ({
        "pages": {
          _page: (page: string | number) => ({
            $url: (url?: { hash?: string }) => ({ pathname: '/posts/tags/[tag]/pages/[page]' as const, query: { tag, page }, hash: url?.hash })
          })
        }
      })
    }
  },
  "projects": {
    $url: (url?: { hash?: string }) => ({ pathname: '/projects' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
