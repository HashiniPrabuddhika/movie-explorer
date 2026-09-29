import { useCallback } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { useNotify } from '../context/NotifyContext';

export default function useFavorite(movie) {
  const { isFavorite, toggleFavorite } = useMovieContext();
  const { notify } = useNotify();
  const fav = movie ? isFavorite(movie.id) : false;

  const toggle = useCallback(() => {
    if (!movie) return;
    toggleFavorite(movie);
    notify(
      fav ? `Removed “${movie.title}” from favorites` : `Added “${movie.title}” to favorites`,
      fav ? 'info' : 'success'
    );
  }, [movie, fav, toggleFavorite, notify]);

  return { fav, toggle };
}