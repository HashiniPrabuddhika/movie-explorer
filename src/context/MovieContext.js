import { createContext, useContext, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const MovieContext = createContext(null);
export const useMovieContext = () => useContext(MovieContext);

export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('me_favorites', []);
  const [lastSearch, setLastSearch] = useLocalStorage('me_last_search', '');

  const isFavorite = useCallback((id) => favorites.some((m) => m.id === id), [favorites]);

  const toggleFavorite = useCallback(
    (movie) =>
      setFavorites((prev) =>
        prev.some((m) => m.id === movie.id)
          ? prev.filter((m) => m.id !== movie.id)
          : [
              ...prev,
              {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
              },
            ]
      ),
    [setFavorites]
  );

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, lastSearch, setLastSearch }),
    [favorites, isFavorite, toggleFavorite, lastSearch, setLastSearch]
  );
  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}