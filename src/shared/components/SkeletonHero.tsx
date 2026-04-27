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
const HERO_HEIGHT = 480

export function SkeletonHero() {
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
      <View style={styles.overlay}>
        <Animated.View style={[styles.tag, animatedStyle]} />
        <Animated.View style={[styles.titleLong, animatedStyle]} />
        <Animated.View style={[styles.titleMid, animatedStyle]} />
        <Animated.View style={[styles.titleShort, animatedStyle]} />
        <Animated.View style={[styles.meta, animatedStyle]} />
      </View>
    </View>
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
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    gap: 10,
  },
  tag: {
    width: 80,
    height: 10,
    borderRadius: 4,
  },
  titleLong: {
    width: '100%',
    height: 20,
    borderRadius: 4,
  },
  titleMid: {
    width: '85%',
    height: 20,
    borderRadius: 4,
  },
  titleShort: {
    width: '60%',
    height: 20,
    borderRadius: 4,
  },
  meta: {
    width: '45%',
    height: 12,
    borderRadius: 4,
    marginTop: 4,
  },
})