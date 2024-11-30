/**
 * @description LS_KEYS contains the keys used to store data in localStorage
 */
export const LS_KEYS = {
  MENU_OPEN: 'k-space-menu-open',
}

export const MEDIA_STATUS = {
  NOT_SEEN: 'not_seen',
  PLANNED: 'planned',
  WATCHING: 'watching',
  ON_HOLD: 'on_hold',
  DROPPED: 'dropped',
  COMPLETED: 'completed',
  NOT_INTERESTED: 'not_interested',
}

export type MediaStatus = (typeof MEDIA_STATUS)[keyof typeof MEDIA_STATUS]

export const MEDIA_RATINGS = {
  EXCELLENT: 'excellent',
  VERY_GOOD: 'very_good',
  GOOD: 'good',
  AVERAGE: 'average',
  MEDIOCRE: 'mediocre',
  BAD: 'bad',
  NOT_FOR_ME: 'not_for_me',
  GUILTY_PLEASURE: 'guilty_pleasure',
} as const

export type MediaRating = keyof typeof MEDIA_RATINGS

export const RATING_EMOJIS = {
  [MEDIA_RATINGS.EXCELLENT]: '🌟',
  [MEDIA_RATINGS.VERY_GOOD]: '❤️',
  [MEDIA_RATINGS.GOOD]: '😊',
  [MEDIA_RATINGS.AVERAGE]: '😐',
  [MEDIA_RATINGS.MEDIOCRE]: '🤔',
  [MEDIA_RATINGS.BAD]: '😡',
  [MEDIA_RATINGS.NOT_FOR_ME]: '🌀',
  [MEDIA_RATINGS.GUILTY_PLEASURE]: '🎭',
}

export const RATING_LABELS = {
  [MEDIA_RATINGS.EXCELLENT]: 'ratings.excellent',
  [MEDIA_RATINGS.VERY_GOOD]: 'ratings.very_good',
  [MEDIA_RATINGS.GOOD]: 'ratings.good',
  [MEDIA_RATINGS.AVERAGE]: 'ratings.average',
  [MEDIA_RATINGS.MEDIOCRE]: 'ratings.mediocre',
  [MEDIA_RATINGS.BAD]: 'ratings.bad',
  [MEDIA_RATINGS.NOT_FOR_ME]: 'ratings.not_for_me',
  [MEDIA_RATINGS.GUILTY_PLEASURE]: 'ratings.guilty_pleasure',
}
