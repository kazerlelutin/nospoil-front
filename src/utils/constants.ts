/**
 * @description LS_KEYS contains the keys used to store data in localStorage
 */
export const LS_KEYS = {
  MENU_OPEN: 'k-space-menu-open',
}

export const MEDIA_STATUS = {
  PLANNED: 'planned',
  WATCHING: 'watching',
  ON_HOLD: 'on_hold',
  DROPPED: 'dropped',
  COMPLETED: 'completed',
  NOT_INTERESTED: 'not_interested',
}

export type MediaStatus = (typeof MEDIA_STATUS)[keyof typeof MEDIA_STATUS]
