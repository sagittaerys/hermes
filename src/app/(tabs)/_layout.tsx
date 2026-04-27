import { Tabs } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { useEffect } from 'react'



function TabBarIcon({ name, color }: any) {
  return <Ionicons name={name} size={20} color={color} />
}



function TabItem({ icon, label, focused, color }: any) {
  const opacity = useSharedValue(focused ? 1 : 0)

  useEffect(() => {
    opacity.value = withTiming(focused ? 1 : 0, { duration: 200 })
  }, [focused])

  const animatedLine = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <View style={styles.tabItem}>
      <TabBarIcon name={icon} color={color} />

      <Animated.Text
        style={[
          styles.label,
          { color: focused ? '#FFFFFF' : '#666666' },
        ]}
      >
        {label}
      </Animated.Text>

      <Animated.View style={[styles.underline, animatedLine]} />
    </View>
  )
}



export default function TabLayout() {
  const insets = useSafeAreaInsets()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: false, 

        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
          height: 64 + insets.bottom,
          paddingTop: 18,
          paddingBottom: 6 + insets.bottom,
          backgroundColor: 'transparent',
        },

        tabBarBackground: () => (
          <BlurView
            intensity={140}
            tint="dark"
            style={StyleSheet.absoluteFillObject}
          />
        ),

        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#666666',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              icon={focused ? 'newspaper' : 'newspaper-outline'}
              label="FEEDS"
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      

      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              icon={focused ? 'search' : 'search-outline'}
              label="SEARCH"
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="bookmarks"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              icon={focused ? 'bookmark' : 'bookmark-outline'}
              label="SAVED"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  )
}



const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  label: {
    fontSize: 9,
    fontWeight: '600',
  },

  underline: {
    marginTop: 6,
    height: 2,
    width: 50,
    backgroundColor: '#C41E3A',
    borderRadius: 2,
  },
})