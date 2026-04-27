import { TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native'
import { Image } from 'expo-image'
import { Text, YStack, XStack } from 'tamagui'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Article } from '@shared/types/article'
import { useBookmarksStore } from '@features/bookmarks/store'

dayjs.extend(relativeTime)

const { width } = Dimensions.get('window')
const HERO_HEIGHT = 480

interface HeroCardProps {
  article: Article
  onPress: (article: Article) => void
}

export function HeroCard({ article, onPress }: HeroCardProps) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarksStore()
  const bookmarked = isBookmarked(article.id)

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(article.id)
    } else {
      addBookmark(article)
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={() => onPress(article)}
      style={styles.container}
    >
      {article.imageUrl ? (
        <Image
          source={{ uri: article.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
      ) : (
        <View style={styles.imageFallback} />
      )}

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.95)']}
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* badges */}
      <XStack
        position="absolute"
        top={16}
        left={16}
        right={16}
        justifyContent="space-between"
        alignItems="center"
      >
        <XStack gap="$2">
          <View style={styles.featuredBadge}>
            <Text
              color="white"
              fontSize={10}
              fontWeight="800"
              letterSpacing={1}
              textTransform="uppercase"
            >
              Featured
            </Text>
          </View>
          {article.section && (
            <View style={styles.sectionBadge}>
              <Text
                color="#f5f5f5"
                fontSize={10}
                fontWeight="600"
                letterSpacing={0.5}
                textTransform="uppercase"
              >
                {article.section}
              </Text>
            </View>
          )}
        </XStack>

        <TouchableOpacity
          onPress={handleBookmark}
          style={styles.bookmarkButton}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color={bookmarked ? '#C41E3A' : '#f5f5f5'}
          />
        </TouchableOpacity>
      </XStack>

      {/* content */}
      <YStack
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        padding="$4"
        gap="$2"
      >
        <Text
          color="#f5f5f5"
          fontSize={22}
          fontWeight="800"
          lineHeight={30}
          numberOfLines={3}
        >
          {article.title}
        </Text>

        {article.abstract ? (
          <Text
            color="rgba(245,245,245,0.75)"
            fontSize={13}
            lineHeight={18}
            numberOfLines={2}
          >
            {article.abstract}
          </Text>
        ) : null}

        <XStack alignItems="center" gap="$2" marginTop="$1">
          <Ionicons name="time-outline" size={12} color="#999" />
          <Text color="#999999" fontSize={12}>
            {dayjs(article.publishedDate).fromNow()}
          </Text>
          {article.byline ? (
            <>
              <Text color="#555555" fontSize={12}>•</Text>
              <Text
                color="#999999"
                fontSize={12}
                numberOfLines={1}
                flex={1}
              >
                {article.byline}
              </Text>
            </>
          ) : null}
        </XStack>
      </YStack>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    height: HERO_HEIGHT,
    backgroundColor: '#111111',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  imageFallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1c1c1c',
  },
  featuredBadge: {
    backgroundColor: '#C41E3A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  sectionBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  bookmarkButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
})