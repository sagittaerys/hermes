import { Tabs } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useEffect } from 'react'

interface TabBarIconProps {
  name: keyof typeof Ionicons.glyphMap
  color: string
  focused: boolean
}

function TabBarIcon({ name, color, focused }: TabBarIconProps) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(focused ? 1 : 0.5)

  useEffect(() => {
    if (focused) {
      scale.value = withSpring(1.15, { damping: 12, stiffness: 200 })
      opacity.value = withTiming(1, { duration: 200 })
    } else {
      scale.value = withSpring(1, { damping: 12, stiffness: 200 })
      opacity.value = withTiming(0.5, { duration: 200 })
    }
  }, [focused])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name={name} size={24} color={color} />
    </Animated.View>
  )
}

function TabBarDot({ focused }: { focused: boolean }) {
  const opacity = useSharedValue(focused ? 1 : 0)
  const scale = useSharedValue(focused ? 1 : 0)

  useEffect(() => {
    opacity.value = withTiming(focused ? 1 : 0, { duration: 200 })
    scale.value = withSpring(focused ? 1 : 0, { damping: 12, stiffness: 200 })
  }, [focused])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View style={[styles.dot, animatedStyle]} />
  )
}

export default function TabLayout() {
  const insets = useSafeAreaInsets()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
          height: 60 + insets.bottom,
          backgroundColor: 'transparent',
        },
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint="dark"
            style={StyleSheet.absoluteFillObject}
          />
        ),
        tabBarActiveTintColor: '#f5f5f5',
        tabBarInactiveTintColor: '#666666',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabItem}>
              <TabBarIcon
                name={focused ? 'newspaper' : 'newspaper-outline'}
                color={color}
                focused={focused}
              />
              <TabBarDot focused={focused} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabItem}>
              <TabBarIcon
                name={focused ? 'search' : 'search-outline'}
                color={color}
                focused={focused}
              />
              <TabBarDot focused={focused} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabItem}>
              <TabBarIcon
                name={focused ? 'bookmark' : 'bookmark-outline'}
                color={color}
                focused={focused}
              />
              <TabBarDot focused={focused} />
            </View>
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#C41E3A',
  },
})