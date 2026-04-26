export interface Article {
  id: string
  title: string
  abstract: string
  url: string
  imageUrl: string | null
  thumbnailUrl: string | null
  byline: string
  publishedDate: string
  section: string
  subsection: string | null
  source: 'top-stories' | 'search'
}

export type ArticleSection =
  | 'home'
  | 'world'
  | 'technology'
  | 'business'
  | 'arts'
  | 'sports'
  | 'science'
  | 'health'
  | 'travel'
  | 'fashion'
  | 'food'

export interface BookmarkedArticle extends Article {
  bookmarkedAt: string
}