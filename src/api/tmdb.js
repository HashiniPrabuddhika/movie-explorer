import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  config.params = {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: 'en-US',
    ...config.params,
  };
  return config;
});

export const isCancel = axios.isCancel;

const get = (url, params, signal) => api.get(url, { params, signal }).then((r) => r.data);

export const imageUrl = (path, size = 'w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export const getErrorMessage = (err) => {
  if (err.code === 'ECONNABORTED') return 'The request timed out. Please try again.';
  if (!err.response) return 'Network error. Please check your internet connection.';
  switch (err.response.status) {
    case 401:
      if (process.env.NODE_ENV !== 'production') {
        console.warn('TMDb rejected the API key. Check REACT_APP_TMDB_API_KEY in .env.local.');
      }
      return 'We could not connect to the movie service. Please try again later.';
    case 404:
      return 'We could not find what you were looking for.';
    case 429:
      return 'Too many requests. Please wait a moment and try again.';
    default:
      return err.response.status >= 500
        ? 'TMDb is having problems right now. Please try again later.'
        : 'Something went wrong. Please try again.';
  }
};

export const fetchTrending = (page = 1, signal) => get('/trending/movie/week', { page }, signal);

export const searchMovies = ({ query, page = 1, year }, signal) =>
  get('/search/movie', { query, page, include_adult: false, year: year || undefined }, signal);

export const discoverMovies = ({ page = 1, genre, year, rating, sort }, signal) =>
  get(
    '/discover/movie',
    {
      page,
      sort_by: sort || 'popularity.desc',
      include_adult: false,
      with_genres: genre || undefined,
      primary_release_year: year || undefined,
      'vote_average.gte': rating || undefined,
      'vote_count.gte': 100,
    },
    signal
  );

export const fetchGenres = (signal) => get('/genre/movie/list', undefined, signal).then((d) => d.genres);

export const fetchMovieDetails = (id, signal) =>
  get(`/movie/${id}`, { append_to_response: 'credits,videos' }, signal);

export const fetchSimilarMovies = (id, signal) =>
  get(`/movie/${id}/similar`, undefined, signal).then((d) => d.results);