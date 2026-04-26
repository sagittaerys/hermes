import { config } from '@tamagui/config/v3'
import { createTamagui, createTokens } from 'tamagui'

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