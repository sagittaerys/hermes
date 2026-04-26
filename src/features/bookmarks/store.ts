import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { mmkvStorageAdapter } from '@shared/lib/storage'
import { BookmarkedArticle, Article } from '@shared/types/article'

interface BookmarksState {
  bookmarks: BookmarkedArticle[]
  addBookmark: (article: Article) => void
  removeBookmark: (id: string) => void
  isBookmarked: (id: string) => boolean
  clearBookmarks: () => void
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (article) => {
        set((state) => ({
          bookmarks: [
            { ...article, bookmarkedAt: new Date().toISOString() },
            ...state.bookmarks,
          ],
        }))
      },

      removeBookmark: (id) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        }))
      },

      isBookmarked: (id) => {
        return get().bookmarks.some((b) => b.id === id)
      },

      clearBookmarks: () => set({ bookmarks: [] }),
    }),
    {
      name: 'hermes-bookmarks',
      storage: createJSONStorage(() => mmkvStorageAdapter),
    }
  )
)