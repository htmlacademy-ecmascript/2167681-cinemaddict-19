const FilterType = {
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITE: 'Favorites',
};

const ACTIVATE_MODE = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

const FILMS_BUTTON_TYPE = {
  WATCHLIST: 'watchlist',
  ALREADY_WATCHED: 'already-watched',
  FAVORITE: 'favorite',
};

const SortMode = {
  DEFAULT: 'default',
  BY_DATE: 'by-date',
  BY_RATING: 'by-rating',
};

const EMOTION = {
  SMILE	:'smile',
  SLEEPING	:'sleeping',
  PUKE	:'puke',
  ANGRY	:'angry'
};

const DATE_FORMATS = {
  RELEASE:'D MMMM YYYY',
  DURATION_M: ' mm[m]',
  DURATION_H_M: 'H[h] mm[m]',
  COMMENT: 'D MMMM YYYY H:MM',
};

const COMPARE_VALUE_FOR_FILM_DURATION = '0 1 0';

const START_VALUE = 0;

export {
  FilterType,
  ACTIVATE_MODE,
  FILMS_BUTTON_TYPE,
  SortMode,
  EMOTION,
  START_VALUE,
  DATE_FORMATS,
  COMPARE_VALUE_FOR_FILM_DURATION
};
