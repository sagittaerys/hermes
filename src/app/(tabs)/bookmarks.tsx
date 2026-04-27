import { useCallback } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { Text, YStack, XStack } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useBookmarksStore } from '@features/bookmarks/store'
import { ArticleCard } from '@features/feed/components/ArticleCard'
import { EmptyState } from '@shared/components/EmptyState'
import { Article } from '@shared/types/article'

export default function BookmarksScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { bookmarks, clearBookmarks } = useBookmarksStore()

  const handleArticlePress = useCallback((article: Article) => {
    router.push({
      pathname: '/article/[id]',
      params: {
        id: article.id,
        title: article.title,
        abstract: article.abstract,
        url: article.url,
        imageUrl: article.imageUrl ?? '',
        byline: article.byline,
        publishedDate: article.publishedDate,
        section: article.section,
      },
    })
  }, [router])

  const renderItem = useCallback(
    ({ item, index }: { item: Article; index: number }) => (
      <ArticleCard
        article={item}
        onPress={handleArticlePress}
        index={index}
        variant="large"
      />
    ),
    [handleArticlePress]
  )

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      {/* header */}
      <XStack
        paddingHorizontal="$4"
        paddingTop="$3"
        paddingBottom="$4"
        alignItems="flex-end"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="#1c1c1c"
      >
        <YStack gap="$1">
          <Text
            color="#C41E3A"
            fontSize={10}
            fontWeight="700"
            letterSpacing={2}
            textTransform="uppercase"
          >
            Library
          </Text>
          <Text
            color="#f5f5f5"
            fontSize={28}
            fontWeight="900"
            letterSpacing={-1}
          >
            Saved Articles
          </Text>
          <Text color="#666666" fontSize={13}>
            {bookmarks.length === 0
              ? 'No articles saved yet'
              : `${bookmarks.length} article${bookmarks.length !== 1 ? 's' : ''} saved on this device`}
          </Text>
        </YStack>

        {bookmarks.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearBookmarks}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={14} color="#666666" />
            <Text
              color="#666666"
              fontSize={12}
              fontWeight="600"
              letterSpacing={0.5}
              textTransform="uppercase"
            >
              Clear All
            </Text>
          </TouchableOpacity>
        )}
      </XStack>

      {/* empty state */}
      {bookmarks.length === 0 && (
        <EmptyState
          title="Nothing saved yet"
          message="Bookmark articles from the feed and they'll appear here for offline reading."
          icon="bookmark-outline"
        />
      )}

      {/* bookmarks */}
      {bookmarks.length > 0 && (
        <FlashList
          data={bookmarks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          getItemType={() => 'large'}
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: 80 + insets.bottom,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2e2e2e',
  },
})