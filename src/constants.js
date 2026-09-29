export const STORAGE_KEYS = {
  mode: 'me_mode',
  user: 'me_user',
  favorites: 'me_favorites',
  lastSearch: 'me_last_search',
};

export const SEARCH_DEBOUNCE_MS = 500;
export const MIN_QUERY_LENGTH = 2;
export const EMPTY_FILTERS = { genre: '', year: '', rating: '', sort: '' };

export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most popular' },
  { value: 'vote_average.desc', label: 'Top rated' },
  { value: 'primary_release_date.desc', label: 'Newest first' },
  { value: 'primary_release_date.asc', label: 'Oldest first' },
];

export const HERO_BG_IMAGE = `${process.env.PUBLIC_URL || ''}/images/hero-bg.jpg`;

export const QUICK_GENRES = [
  { id: '28', label: 'Action' },
  { id: '35', label: 'Comedy' },
  { id: '18', label: 'Drama' },
  { id: '27', label: 'Horror' },
  { id: '878', label: 'Sci-Fi' },
  { id: '10749', label: 'Romance' },
  { id: '16', label: 'Animation' },
];
