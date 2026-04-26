// import { NYTTopStoriesResponse, NYTTopStoriesResult } from '@shared/types/api'
// import { Article, ArticleSection } from '@shared/types/article'
// import { nytApi } from '@shared/lib/api'

// const IMAGE_FORMATS = ['superJumbo', 'Large', 'mediumThreeByTwo440', 'Normal']
// const THUMB_FORMATS = ['thumbnail', 'Small', 'mediumThreeByTwo210']

// const getBestImage = (
//   multimedia: NYTTopStoriesResult['multimedia'],
//   preferred: string[]
// ): string | null => {
//   if (!multimedia || multimedia.length === 0) return null
//   for (const format of preferred) {
//     const match = multimedia.find((m) => m.format === format)
//     if (match) return match.url
//   }
//   return multimedia[0]?.url ?? null
// }

// export const normalizeTopStory = (item: NYTTopStoriesResult): Article => ({
//   id: item.uri,
//   title: item.title,
//   abstract: item.abstract,
//   url: item.url,
//   imageUrl: getBestImage(item.multimedia, IMAGE_FORMATS),
//   thumbnailUrl: getBestImage(item.multimedia, THUMB_FORMATS),
//   byline: item.byline.replace(/^By /i, ''),
//   publishedDate: item.published_date,
//   section: item.section,
//   subsection: item.subsection || null,
//   source: 'top-stories',
// })

// export const fetchTopStories = async (section: ArticleSection): Promise<Article[]> => {
//   const { data } = await nytApi.get<NYTTopStoriesResponse>(
//     `/topstories/v2/${section}.json`
//   )
//   return data.results.map(normalizeTopStory)
// }