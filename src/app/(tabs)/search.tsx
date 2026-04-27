import { useState, useCallback } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { Text, YStack, XStack } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated'

import { useSearch } from '@features/search/hooks/useSearch'
import { ArticleCard } from '@features/feed/components/ArticleCard'
import { SkeletonList } from '@shared/components/SkeletonCard'
import { ErrorState } from '@shared/components/ErrorState'
import { EmptyState } from '@shared/components/EmptyState'
import { Article } from '@shared/types/article'

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

export default function SearchScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const { data, isLoading, isError, error, refetch } = useSearch(query)

  const focusProgress = useSharedValue(0)

  const borderColor = useDerivedValue(() =>
    interpolateColor(
      focusProgress.value,
      [0, 1],
      ['#2e2e2e', '#C41E3A']
    )
  )

  const animatedInputStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
  }))

  const handleFocus = () => {
    setIsFocused(true)
    focusProgress.value = withTiming(1, { duration: 200 })
  }

  const handleBlur = () => {
    setIsFocused(false)
    focusProgress.value = withTiming(0, { duration: 200 })
  }

  const handleClear = () => {
    setQuery('')
  }

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

  const hasQuery = query.trim().length >= 3
  const hasResults = data && data.length > 0

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <YStack
        paddingHorizontal="$4"
        paddingTop="$3"
        paddingBottom="$4"
        gap="$1"
        borderBottomWidth={1}
        borderBottomColor="#1c1c1c"
      >
        <Text
          color="#C41E3A"
          fontSize={10}
          fontWeight="700"
          letterSpacing={2}
          textTransform="uppercase"
        >
          Search
        </Text>
        <Text
          color="#f5f5f5"
          fontSize={28}
          fontWeight="900"
          letterSpacing={-1}
        >
          Find articles
        </Text>

        {/* Search Input */}
        <XStack
          alignItems="center"
          marginTop="$3"
          gap="$2"
        >
          <Animated.View style={[styles.inputContainer, animatedInputStyle]}>
            <Ionicons
              name="search-outline"
              size={18}
              color={isFocused ? '#C41E3A' : '#666666'}
            />
            <AnimatedTextInput
              style={styles.input}
              placeholder="Search articles..."
              placeholderTextColor="#555555"
              value={query}
              onChangeText={setQuery}
              onFocus={handleFocus}
              onBlur={handleBlur}
              returnKeyType="search"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {query.length > 0 && (
              <TouchableOpacity
                onPress={handleClear}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="close" size={18} color="#666666" />
              </TouchableOpacity>
            )}
          </Animated.View>
        </XStack>

        {/* Results count */}
        {hasQuery && hasResults && !isLoading && (
          <Text
            color="#666666"
            fontSize={12}
            marginTop="$2"
          >
            {data.length} result{data.length !== 1 ? 's' : ''} for "{query}"
          </Text>
        )}
      </YStack>

      {/* Loading */}
      {isLoading && hasQuery && (
        <SkeletonList />
      )}

      {/* Error */}
      {isError && (
        <ErrorState
          message={
            error instanceof Error
              ? error.message
              : 'Search failed. Please try again.'
          }
          onRetry={refetch}
        />
      )}

      {/* Empty — no query */}
      {!hasQuery && !isLoading && (
        <YStack flex={1} alignItems="center" justifyContent="center" gap="$3">
          <Ionicons name="search-outline" size={48} color="#2e2e2e" />
          <YStack alignItems="center" gap="$1">
            <Text color="#f5f5f5" fontSize={18} fontWeight="700">
              Search for anything
            </Text>
            <Text color="#666666" fontSize={14} textAlign="center">
              Type at least 3 characters{'\n'}to find articles
            </Text>
          </YStack>
        </YStack>
      )}

      {/* Empty — query but no results */}
      {hasQuery && !isLoading && !isError && !hasResults && (
        <EmptyState
          title="No results found"
          message={`We couldn't find anything for "${query}". Try different keywords.`}
          icon="document-outline"
        />
      )}

      {/* Results */}
      {hasResults && !isLoading && !isError && (
        <FlashList
          data={data}
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
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    color: '#f5f5f5',
    fontSize: 15,
    padding: 0,
  },
})