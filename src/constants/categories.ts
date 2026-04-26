import { ArticleSection } from '@shared/types/article'

export interface Category {
  label: string
  slug: ArticleSection
  icon: string
  iconFamily: 'Ionicons' | 'Feather' | 'MaterialIcons'
}

export const CATEGORIES: Category[] = [
  { label: 'Top Stories', slug: 'home',       icon: 'home',              iconFamily: 'Ionicons' },
  { label: 'World',       slug: 'world',      icon: 'globe-outline',     iconFamily: 'Ionicons' },
  { label: 'Technology',  slug: 'technology', icon: 'cpu',               iconFamily: 'Feather' },
  { label: 'Business',    slug: 'business',   icon: 'trending-up',       iconFamily: 'Feather' },
  { label: 'Arts',        slug: 'arts',       icon: 'color-palette',     iconFamily: 'Ionicons' },
  { label: 'Sports',      slug: 'sports',     icon: 'trophy-outline',    iconFamily: 'Ionicons' },
  { label: 'Science',     slug: 'science',    icon: 'flask-outline',     iconFamily: 'Ionicons' },
  { label: 'Health',      slug: 'health',     icon: 'heart-outline',     iconFamily: 'Ionicons' },
  { label: 'Travel',      slug: 'travel',     icon: 'airplane-outline',  iconFamily: 'Ionicons' },
  { label: 'Fashion',     slug: 'fashion',    icon: 'shirt-outline',     iconFamily: 'Ionicons' },
  { label: 'Food',        slug: 'food',       icon: 'restaurant-outline', iconFamily: 'Ionicons' },
]

export const DEFAULT_CATEGORY: ArticleSection = 'home'