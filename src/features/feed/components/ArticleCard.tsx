import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Image } from 'expo-image'
import { Text, YStack, XStack } from 'tamagui'
import { Ionicons } from '@expo/vector-icons'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Article } from '@shared/types/article'
import { useBookmarksStore } from '@features/bookmarks/store'
import { useEffect } from 'react'

dayjs.extend(relativeTime)

interface ArticleCardProps {
  article: Article
  onPress: (article: Article) => void
  index?: number
  variant?: 'default' | 'grid' | 'large'
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

export function ArticleCard({
  article,
  onPress,
  index = 0,
  variant = 'default',
}: ArticleCardProps) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarksStore()
  const bookmarked = isBookmarked(article.id)

  //  animation via rn-animated
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(24)

  useEffect(() => {
    const delay = index * 80
    opacity.value = withTiming(1, { duration: 400 })
    translateY.value = withSpring(0, {
      damping: 18,
      stiffness: 180,
      delay,
    } as any)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(article.id)
    } else {
      addBookmark(article)
    }
  }

  if (variant === 'large') {
    return <LargeCard article={article} onPress={onPress} index={index} />
  }

  if (variant === 'grid') {
    return (
      <AnimatedTouchable
        style={[styles.gridContainer, animatedStyle]}
        activeOpacity={0.85}
        onPress={() => onPress(article)}
      >
        {article.imageUrl ? (
          <Image
            source={{ uri: article.imageUrl }}
            style={styles.gridImage}
            contentFit="cover"
            transition={300}
          />
        ) : (
          <View style={styles.gridImageFallback} />
        )}
        <TouchableOpacity
          style={styles.gridBookmark}
          onPress={handleBookmark}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={14}
            color={bookmarked ? '#C41E3A' : '#f5f5f5'}
          />
        </TouchableOpacity>
        <YStack padding="$2" gap="$1" flex={1}>
          <XStack alignItems="center" gap="$1">
            <Text
              color="#C41E3A"
              fontSize={10}
              fontWeight="700"
              letterSpacing={0.5}
              textTransform="uppercase"
              numberOfLines={1}
              flex={1}
            >
              {article.section}
            </Text>
            <Ionicons name="time-outline" size={10} color="#666" />
            <Text color="#666666" fontSize={10}>
              {dayjs(article.publishedDate).fromNow()}
            </Text>
          </XStack>
          <Text
            color="#f5f5f5"
            fontSize={13}
            fontWeight="700"
            lineHeight={18}
            numberOfLines={3}
          >
            {article.title}
          </Text>
          <Text
            color="#999999"
            fontSize={11}
            lineHeight={15}
            numberOfLines={2}
          >
            {article.abstract}
          </Text>
        </YStack>
      </AnimatedTouchable>
    )
  }

  // horizontal card
  return (
    <AnimatedTouchable
      style={[styles.container, animatedStyle]}
      activeOpacity={0.85}
      onPress={() => onPress(article)}
    >
      <YStack flex={1} gap="$1" justifyContent="center">
        <XStack alignItems="center" gap="$1">
          <Text
            color="#C41E3A"
            fontSize={10}
            fontWeight="700"
            letterSpacing={0.5}
            textTransform="uppercase"
            numberOfLines={1}
            flex={1}
          >
            {article.section}
          </Text>
          <Ionicons name="time-outline" size={10} color="#666" />
          <Text color="#666666" fontSize={10}>
            {dayjs(article.publishedDate).fromNow()}
          </Text>
        </XStack>

        <Text
          color="#f5f5f5"
          fontSize={15}
          fontWeight="700"
          lineHeight={21}
          numberOfLines={3}
        >
          {article.title}
        </Text>

        <Text
          color="#999999"
          fontSize={12}
          lineHeight={17}
          numberOfLines={2}
        >
          {article.abstract}
        </Text>
      </YStack>

      <View style={styles.imageContainer}>
        {article.thumbnailUrl ? (
          <Image
            source={{ uri: article.thumbnailUrl }}
            style={styles.image}
            contentFit="cover"
            transition={300}
          />
        ) : (
          <View style={styles.imageFallback} />
        )}
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={handleBookmark}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={14}
            color={bookmarked ? '#C41E3A' : '#f5f5f5'}
          />
        </TouchableOpacity>
      </View>
    </AnimatedTouchable>
  )
}

// large card variant that'll appear for search results
function LargeCard({
  article,
  onPress,
}: {
  article: Article
  onPress: (article: Article) => void
  index: number
}) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarksStore()
  const bookmarked = isBookmarked(article.id)

  const opacity = useSharedValue(0)
  const translateY = useSharedValue(24)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400 })
    translateY.value = withSpring(0, {
      damping: 18,
      stiffness: 180,
    } as any)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(article.id)
    } else {
      addBookmark(article)
    }
  }

  return (
    <Animated.View style={[styles.largeContainer, animatedStyle]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onPress(article)}
      >
        {article.imageUrl ? (
          <Image
            source={{ uri: article.imageUrl }}
            style={styles.largeImage}
            contentFit="cover"
            transition={300}
          />
        ) : (
          <View style={styles.largeImageFallback} />
        )}

        <TouchableOpacity
          style={styles.largeBookmark}
          onPress={handleBookmark}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={16}
            color={bookmarked ? '#C41E3A' : '#f5f5f5'}
          />
        </TouchableOpacity>

        <YStack padding="$3" gap="$2">
          <XStack alignItems="center" gap="$2">
            <Text
              color="#C41E3A"
              fontSize={11}
              fontWeight="700"
              letterSpacing={0.5}
              textTransform="uppercase"
            >
              {article.section}
            </Text>
            <Text color="#555555" fontSize={11}>•</Text>
            <Ionicons name="time-outline" size={11} color="#666" />
            <Text color="#666666" fontSize={11}>
              {dayjs(article.publishedDate).fromNow()}
            </Text>
          </XStack>

          <Text
            color="#f5f5f5"
            fontSize={18}
            fontWeight="800"
            lineHeight={25}
            numberOfLines={3}
          >
            {article.title}
          </Text>

          <Text
            color="#999999"
            fontSize={13}
            lineHeight={19}
            numberOfLines={3}
          >
            {article.abstract}
          </Text>
        </YStack>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  // default horizontal card
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1c',
    gap: 12,
    backgroundColor: '#0a0a0a',
  },
  imageContainer: {
    position: 'relative',
    flexShrink: 0,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  imageFallback: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#1c1c1c',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 5,
    borderRadius: 6,
  },

  // grid card
  gridContainer: {
    flex: 1,
    backgroundColor: '#111111',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1c1c1c',
  },
  gridImage: {
    width: '100%',
    height: 130,
  },
  gridImageFallback: {
    width: '100%',
    height: 130,
    backgroundColor: '#1c1c1c',
  },
  gridBookmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 6,
    borderRadius: 6,
  },

  // large card
  largeContainer: {
    backgroundColor: '#111111',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1c1c1c',
  },
  largeImage: {
    width: '100%',
    height: 200,
  },
  largeImageFallback: {
    width: '100%',
    height: 200,
    backgroundColor: '#1c1c1c',
  },
  largeBookmark: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
})