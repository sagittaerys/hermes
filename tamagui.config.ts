import { config } from '@tamagui/config/v3'
import { createTamagui, createTokens } from 'tamagui'
import { createFont } from 'tamagui'

const playfairFont = createFont({
  family: 'PlayfairDisplay_900Black',
  size: {
    1: 12, 2: 14, 3: 16, 4: 18, 5: 20,
    6: 24, 7: 28, 8: 32, 9: 40, 10: 48,
  },
  lineHeight: {
    1: 17, 2: 22, 3: 25, 4: 28, 5: 30,
    6: 34, 7: 38, 8: 44, 9: 52, 10: 60,
  },
  weight: {
    4: '400', 7: '700', 9: '900',
  },
  letterSpacing: {
    4: 0, 7: -0.5,
  },
})

const playfairBoldFont = createFont({
  family: 'PlayfairDisplay_700Bold',
  size: {
    1: 12, 2: 14, 3: 16, 4: 18, 5: 20,
    6: 24, 7: 28, 8: 32, 9: 40, 10: 48,
  },
  lineHeight: {
    1: 17, 2: 22, 3: 25, 4: 28, 5: 30,
    6: 34, 7: 38, 8: 44, 9: 52, 10: 60,
  },
  weight: {
    4: '400', 7: '700',
  },
  letterSpacing: {
    4: 0, 7: -0.5,
  },
})

const tokens = createTokens({
  ...config.tokens,
  color: {
    ...config.tokens.color,

    // brand
    brandRed: '#C41E3A',
    brandRedDark: '#A01830',

    // backgrounds
    bgPrimary: '#0a0a0a',
    bgSecondary: '#111111',
    bgCard: '#161616',
    bgElevated: '#1c1c1c',

    // surface
    surfaceLight: '#222222',
    surfaceMid: '#2a2a2a',
    surfaceBorder: '#2e2e2e',

    // text
    textPrimary: '#f5f5f5',
    textSecondary: '#a3a3a3',
    textMuted: '#666666',
    textInverse: '#0a0a0a',

    // semantic
    success: '#4ade80',
    warning: '#facc15',
    error: '#f87171',

    // overlay
    overlay60: 'rgba(0,0,0,0.6)',
    overlay80: 'rgba(0,0,0,0.8)',
  },
  space: {
    ...config.tokens.space,
    true: 16,
  },
  radius: {
    ...config.tokens.radius,
    card: 12,
    pill: 999,
  },
})

const hermesTheme = {
  background: tokens.color.bgPrimary,
  backgroundSecondary: tokens.color.bgSecondary,
  backgroundCard: tokens.color.bgCard,
  backgroundElevated: tokens.color.bgElevated,
  borderColor: tokens.color.surfaceBorder,
  color: tokens.color.textPrimary,
  colorSecondary: tokens.color.textSecondary,
  colorMuted: tokens.color.textMuted,
  placeholderColor: tokens.color.textMuted,
  brandRed: tokens.color.brandRed,
}

export const tamaguiConfig = createTamagui({
  ...config,
  tokens,
  fonts: {
  ...config.fonts,
  heading: playfairBoldFont,
  display: playfairFont,
},
  themes: {
    ...config.themes,
    dark: {
      ...config.themes.dark,
      ...hermesTheme,
    },
    light: {
      ...config.themes.light,
      ...hermesTheme,
      background: '#f5f5f5',
      backgroundSecondary: '#efefef',
      backgroundCard: '#ffffff',
      color: '#0a0a0a',
      colorSecondary: '#525252',
    },
  },
  settings: {
    ...config.settings,
    allowedStyleValues: 'somewhat-strict',
    autocompleteSpecificTokens: 'except-special',
    fastSchemeChange: true,
  },
  animations: config.animations,
})


export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}