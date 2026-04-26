import { useQuery } from '@tanstack/react-query'
import { ArticleSection } from '@shared/types/article'
import { fetchTopStories } from './useTopStories'

export const FEED_QUERY_KEY = (section: ArticleSection) => ['feed', section]

export const useFeed = (section: ArticleSection) => {
  return useQuery({
    queryKey: FEED_QUERY_KEY(section),
    queryFn: () => fetchTopStories(section),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60 * 24,
  })
}