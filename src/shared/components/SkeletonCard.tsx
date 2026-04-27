import { useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated'

const { width } = Dimensions.get('window')

export function SkeletonCard() {
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#1c1c1c', '#2a2a2a']
    ),
  }))

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.image, animatedStyle]} />
      <View style={styles.content}>
        <Animated.View style={[styles.tag, animatedStyle]} />
        <Animated.View style={[styles.titleLong, animatedStyle]} />
        <Animated.View style={[styles.titleShort, animatedStyle]} />
        <Animated.View style={[styles.meta, animatedStyle]} />
      </View>
    </View>
  )
}

export function SkeletonList() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1c',
    gap: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
  tag: {
    width: 60,
    height: 10,
    borderRadius: 4,
  },
  titleLong: {
    width: '100%',
    height: 14,
    borderRadius: 4,
  },
  titleShort: {
    width: '70%',
    height: 14,
    borderRadius: 4,
  },
  meta: {
    width: '50%',
    height: 10,
    borderRadius: 4,
  },
})