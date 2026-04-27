import { ArticleSection } from '@shared/types/article'

export interface Category {
  label: string
  slug: ArticleSection
  icon: string
  iconFamily: 'Ionicons' | 'Feather' | 'MaterialIcons'
}

export const SECTION_COLORS: Record<string, string> = {
  technology: '#0d1117',
  business: '#0d1a0d',
  sports: '#1a0d0d',
  health: '#0d1a1a',
  arts: '#1a0d1a',
  science: '#0d0f1a',
  world: '#1a1500',
  travel: '#001a1a',
  fashion: '#1a0d15',
  food: '#1a1000',
  home: '#111111',
  general: '#1c1c1c',
}

export const getSectionColor = (section: string): string => {
  return SECTION_COLORS[section.toLowerCase()] ?? SECTION_COLORS.general
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