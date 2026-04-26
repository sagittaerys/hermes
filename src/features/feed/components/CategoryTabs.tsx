import { useRef } from 'react'
import { ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Text } from 'tamagui'
import { CATEGORIES, Category } from '@constants/categories'
import { ArticleSection } from '@shared/types/article'

interface CategoryTabsProps {
  activeSection: ArticleSection
  onSectionChange: (section: ArticleSection) => void
}

export function CategoryTabs({ activeSection, onSectionChange }: CategoryTabsProps) {
  const scrollRef = useRef<ScrollView>(null)

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.root}
    >
      {CATEGORIES.map((category) => (
        <Tab
          key={category.slug}
          category={category}
          isActive={activeSection === category.slug}
          onPress={() => onSectionChange(category.slug)}
        />
      ))}
    </ScrollView>
  )
}

interface TabProps {
  category: Category
  isActive: boolean
  onPress: () => void
}

function Tab({ category, isActive, onPress }: TabProps) {
  const underlineWidth = useRef(new Animated.Value(isActive ? 1 : 0)).current

  const handlePress = () => {
    Animated.spring(underlineWidth, {
      toValue: 1,
      useNativeDriver: true,
      damping: 15,
      stiffness: 200,
    }).start()
    onPress()
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.tab}
      activeOpacity={0.7}
    >
      <Text
        fontSize={13}
        fontWeight={isActive ? '700' : '400'}
        color={isActive ? '#f5f5f5' : '#666666'}
        letterSpacing={0.5}
        textTransform="uppercase"
      >
        {category.label}
      </Text>
      {isActive && (
        <Animated.View
          style={[
            styles.underline,
            {
              transform: [{ scaleX: underlineWidth }],
            },
          ]}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1c',
  },
  container: {
    paddingHorizontal: 16,
    gap: 0,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    position: 'relative',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 12,
    right: 12,
    height: 2,
    backgroundColor: '#C41E3A',
    borderRadius: 1,
  },
})