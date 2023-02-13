const FilterType = {
  ALL: 'All movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
};

const ACTIVE_MODE = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

const FILMS_BUTTON_TYPE = {
  WATCHLIST: 'watchlist',
  ALREADY_WATCHED: 'already-watched',
  FAVORITE: 'favorites',
};

const SortMode = {
  DEFAULT: 'default',
  BY_DATE: 'by-date',
  BY_RATING: 'by-rating',
};

const Emotion = {
  SMILE	:'smile',
  SLEEPING	:'sleeping',
  PUKE	:'puke',
  ANGRY	:'angry'
};

const DATE_FORMATS = {
  RELEASE:'D MMMM YYYY',
  DURATION_M: ' mm[m]',
  DURATION_H_M: 'H[h] mm[m]',
  COMMENT: 'D MMMM YYYY HH:mm',
};

const NUMBER_TO_COMPARE = '0 1 0';

const START_VALUE = 0;

const FormsTextArea = {
  COMMENT_FILM : 'comment-film'
};

const UserAction = {
  UPDATE_FILM: 'update-film',
  DELETE_COMMENT: 'delete-comment',
  ADD_COMMENT: 'add-comment',
};

const UpdateType = {
  INIT: 'INIT',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};


const Rangs = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export {
  FilterType,
  ACTIVE_MODE,
  FILMS_BUTTON_TYPE,
  SortMode,
  Emotion,
  START_VALUE,
  DATE_FORMATS,
  NUMBER_TO_COMPARE,
  UpdateType,
  UserAction,
  Rangs,
  Method,
  FormsTextArea
};
