// import { useQuery } from '@tanstack/react-query'
// import { useEffect, useState } from 'react'
// import { nytApi } from '@shared/lib/api'
// import { NYTSearchResponse } from '@shared/types/api'
// import { Article } from '@shared/types/article'

// const DEBOUNCE_MS = 500
// const MIN_QUERY_LENGTH = 3

// const normalizeSearchResult = (doc: NYTSearchResponse['response']['docs'][0]): Article => {
//   const image = doc.multimedia?.find((m) => m.subtype === 'xlarge' || m.subtype === 'master1050')
//   return {
//     id: doc._id,
//     title: doc.headline.main,
//     abstract: doc.abstract || doc.snippet,
//     url: doc.web_url,
//     imageUrl: image ? `https://www.nytimes.com/${image.url}` : null,
//     thumbnailUrl: image ? `https://www.nytimes.com/${image.url}` : null,
//     byline: doc.byline?.original?.replace(/^By /i, '') ?? '',
//     publishedDate: doc.pub_date,
//     section: doc.section_name ?? 'general',
//     subsection: null,
//     source: 'search',
//   }
// }

// export const useSearch = (rawQuery: string) => {
//   const [debouncedQuery, setDebouncedQuery] = useState(rawQuery)

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedQuery(rawQuery)
//     }, DEBOUNCE_MS)
//     return () => clearTimeout(timer)
//   }, [rawQuery])

//   const isEnabled = debouncedQuery.trim().length >= MIN_QUERY_LENGTH

//   return useQuery({
//     queryKey: ['search', debouncedQuery],
//     queryFn: async () => {
//       const { data } = await nytApi.get<NYTSearchResponse>('/search/v2/articlesearch.json', {
//         params: {
//           q: debouncedQuery,
//           sort: 'newest',
//           fl: 'headline,abstract,web_url,pub_date,byline,multimedia,section_name,snippet,_id',
//         },
//       })
//       return data.response.docs.map(normalizeSearchResult)
//     },
//     enabled: isEnabled,
//     staleTime: 1000 * 60 * 2,
//   })
// }