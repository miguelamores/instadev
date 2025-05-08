export const FEATURE_FLAGS = {
  POST_CARD_STATS: import.meta.env.VITE_FEATURE_FLAG_POST_CARD_STATS === 'true',
  EXPLORE_MENU_NAVIGATION:
    import.meta.env.VITE_FEATURE_FLAG_EXPLORE_MENU_NAVIGATION === 'true'
} as const

export type FeatureFlagNames = keyof typeof FEATURE_FLAGS
