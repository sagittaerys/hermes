import { useCallback, useState } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Share,
  Image,
} from 'react-native'
import { Text, YStack, XStack } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { WebView } from 'react-native-webview'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedRef,
  useScrollOffset,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { useBookmarksStore } from '@features/bookmarks/store'
import { Article } from '@shared/types/article'

dayjs.extend(relativeTime)

const HERO_HEIGHT = 320
const HEADER_HEIGHT = 60

export default function ArticleScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const params = useLocalSearchParams<{
    id: string
    title: string
    abstract: string
    url: string
    imageUrl: string
    byline: string
    publishedDate: string
    section: string
  }>()

  const [showWebView, setShowWebView] = useState(false)
  const [webViewLoading, setWebViewLoading] = useState(true)

  const { isBookmarked, addBookmark, removeBookmark } = useBookmarksStore()
  const bookmarked = isBookmarked(params.id)

const animatedRef = useAnimatedRef<Animated.ScrollView>()
const scrollY = useScrollOffset(animatedRef)

  const article: Article = {
    id: params.id,
    title: params.title,
    abstract: params.abstract,
    url: params.url,
    imageUrl: params.imageUrl || null,
    thumbnailUrl: params.imageUrl || null,
    byline: params.byline,
    publishedDate: params.publishedDate,
    section: params.section,
    subsection: null,
    source: 'top-stories',
  }

 

  // hero image parallax
  const heroAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, HERO_HEIGHT],
          [0, -HERO_HEIGHT / 2],
          Extrapolation.CLAMP
        ),
      },
    ],
  }))

  // header fade in on scroll
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [HERO_HEIGHT - 100, HERO_HEIGHT - 40],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }))

  // back button background fade
  const backButtonAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolate(
      scrollY.value,
      [0, HERO_HEIGHT - 100],
      [0.6, 0],
      Extrapolation.CLAMP
    ) === 0.6
      ? 'rgba(0,0,0,0.6)'
      : 'transparent',
  }))

  const handleBookmark = useCallback(() => {
    if (bookmarked) {
      removeBookmark(article.id)
    } else {
      addBookmark(article)
    }
  }, [bookmarked, article])

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.url}`,
        url: article.url,
        title: article.title,
      })
    } catch (error) {
      console.error(error)
    }
  }, [article])

  if (showWebView) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
         {/* webview header */}
        <XStack
          height={HEADER_HEIGHT}
          paddingHorizontal="$4"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderBottomColor="#1c1c1c"
          backgroundColor="#0a0a0a"
        >
          <TouchableOpacity
            onPress={() => setShowWebView(false)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="arrow-back" size={22} color="#f5f5f5" />
          </TouchableOpacity>
          <Text
            color="#f5f5f5"
            fontSize={14}
            fontWeight="600"
            numberOfLines={1}
            flex={1}
            marginHorizontal="$3"
          >
            {article.title}
          </Text>
          <TouchableOpacity
            onPress={() => setShowWebView(false)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="close" size={22} color="#f5f5f5" />
          </TouchableOpacity>
        </XStack>

        {webViewLoading && (
          <View style={styles.webViewLoader}>
            <Text color="#666666" fontSize={13}>
              Loading article...
            </Text>
          </View>
        )}

        <WebView
          source={{ uri: article.url }}
          style={styles.webView}
          onLoadStart={() => setWebViewLoading(true)}
          onLoadEnd={() => setWebViewLoading(false)}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* sticky fade in header on scroll */}
      <Animated.View
        style={[
          styles.stickyHeader,
          { paddingTop: insets.top, height: HEADER_HEIGHT + insets.top },
          headerAnimatedStyle,
        ]}
      >
        <XStack
          flex={1}
          paddingHorizontal="$4"
          alignItems="center"
          justifyContent="space-between"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="arrow-back" size={22} color="#f5f5f5" />
          </TouchableOpacity>
          <Text
            color="#f5f5f5"
            fontSize={14}
            fontWeight="600"
            numberOfLines={1}
            flex={1}
            marginHorizontal="$3"
          >
            {article.section}
          </Text>
          <XStack gap="$3" alignItems="center">
            <TouchableOpacity
              onPress={handleBookmark}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                size={22}
                color={bookmarked ? '#C41E3A' : '#f5f5f5'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShare}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name="share-outline"
                size={22}
                color="#f5f5f5"
              />
            </TouchableOpacity>
          </XStack>
        </XStack>
      </Animated.View>

      <Animated.ScrollView
  ref={animatedRef}
  showsVerticalScrollIndicator={false}
  style={styles.scrollView}
  contentContainerStyle={{
    paddingBottom: 40 + insets.bottom,
  }}
>
        {/* image */}
        <View style={styles.heroContainer}>
          <Animated.View style={[styles.heroImageWrapper, heroAnimatedStyle]}>
            {article.imageUrl ? (
              <Image
                source={{ uri: article.imageUrl }}
                style={styles.heroImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.heroFallback} />
            )}
          </Animated.View>

          {/* back-btn*/}
          <Animated.View
            style={[
              styles.floatingBack,
              { top: insets.top + 12 },
              backButtonAnimatedStyle,
            ]}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="arrow-back" size={22} color="#f5f5f5" />
            </TouchableOpacity>
          </Animated.View>

          {/* actions */}
          <Animated.View
            style={[
              styles.floatingActions,
              { top: insets.top + 12 },
              backButtonAnimatedStyle,
            ]}
          >
            <TouchableOpacity
              onPress={handleBookmark}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                size={22}
                color={bookmarked ? '#C41E3A' : '#f5f5f5'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShare}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="share-outline" size={22} color="#f5f5f5" />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* content */}
        <YStack
          padding="$4"
          gap="$4"
          backgroundColor="#0a0a0a"
        >
          {/* tag */}
          <Text
            color="#C41E3A"
            fontSize={11}
            fontWeight="700"
            letterSpacing={2}
            textTransform="uppercase"
          >
            {article.section}
          </Text>

          {/* title */}
          <Text
            color="#f5f5f5"
            fontSize={26}
            fontFamily="$heading"
            lineHeight={34}
            letterSpacing={-0.5}
          >
            {article.title}
          </Text>

          {/* meta */}
          <XStack
            alignItems="center"
            gap="$2"
            paddingBottom="$4"
            borderBottomWidth={1}
            borderBottomColor="#1c1c1c"
          >
            <Ionicons name="time-outline" size={13} color="#666" />
            <Text color="#666666" fontSize={13}>
              {dayjs(article.publishedDate).fromNow()}
            </Text>
            {article.byline ? (
              <>
                <Text color="#333333" fontSize={13}>•</Text>
                <Text
                  color="#999999"
                  fontSize={13}
                  flex={1}
                  numberOfLines={1}
                >
                  {article.byline}
                </Text>
              </>
            ) : null}
          </XStack>

          {/* abstract */}
          <Text
            color="#a3a3a3"
            fontSize={16}
            lineHeight={26}
          >
            {article.abstract}
          </Text>

          {/* read btn */}
          <TouchableOpacity
            style={styles.readButton}
            onPress={() => setShowWebView(true)}
            activeOpacity={0.85}
          >
            <Text
              color="#f5f5f5"
              fontSize={14}
              fontWeight="700"
              letterSpacing={0.5}
              textTransform="uppercase"
            >
              Read Full Article
            </Text>
            <Ionicons name="arrow-forward" size={16} color="#f5f5f5" />
          </TouchableOpacity>

          {/* attribution */}
          <XStack alignItems="center" gap="$2" justifyContent="center">
            <Ionicons name="newspaper-outline" size={13} color="#333333" />
            <Text color="#333333" fontSize={12}>
              Content from The New York Times
            </Text>
          </XStack>
        </YStack>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1c',
    justifyContent: 'flex-end',
  },
  heroContainer: {
    height: HERO_HEIGHT,
    overflow: 'hidden',
    backgroundColor: '#111111',
  },
  heroImageWrapper: {
    height: HERO_HEIGHT * 1.3,
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1c1c1c',
  },
  floatingBack: {
    position: 'absolute',
    left: 16,
    padding: 8,
    borderRadius: 20,
  },
  floatingActions: {
    position: 'absolute',
    right: 16,
    flexDirection: 'row',
    gap: 16,
    padding: 8,
    borderRadius: 20,
  },
  readButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#C41E3A',
    paddingVertical: 14,
    borderRadius: 10,
  },
  webView: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  webViewLoader: {
    position: 'absolute',
    top: HEADER_HEIGHT + 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
})