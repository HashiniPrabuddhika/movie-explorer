import { useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchTrending,
  searchMovies,
  discoverMovies,
  getErrorMessage,
  isCancel,
} from '../api/tmdb';

const dedupe = (list) => {
  const seen = new Set();
  return list.filter((m) => (seen.has(m.id) ? false : seen.add(m.id)));
};

export default function useMovies({ query, genre, year, rating, sort }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controller = useRef(null);

  const hasFilters = Boolean(genre || year || rating || sort);
  const mode = query ? 'search' : hasFilters ? 'discover' : 'trending';

  const load = useCallback(
    async (pageToLoad, reset) => {
      controller.current?.abort(); 
      const ctrl = new AbortController();
      controller.current = ctrl;
      setLoading(true);
      setError(null);
      try {
        let data;
        if (query) data = await searchMovies({ query, page: pageToLoad, year }, ctrl.signal);
        else if (hasFilters)
          data = await discoverMovies({ page: pageToLoad, genre, year, rating, sort }, ctrl.signal);
        else data = await fetchTrending(pageToLoad, ctrl.signal);

        let results = data.results;
        if (query) {
          if (genre) results = results.filter((m) => m.genre_ids?.includes(Number(genre)));
          if (rating) results = results.filter((m) => m.vote_average >= Number(rating));
        }
        setMovies((prev) => (reset ? results : dedupe([...prev, ...results])));
        setPage(pageToLoad);
        setTotalPages(data.total_pages);
      } catch (err) {
        if (isCancel(err)) return; 
        setError(getErrorMessage(err));
      } finally {
        if (controller.current === ctrl) setLoading(false);
      }
    },
    [query, genre, year, rating, sort, hasFilters]
  );

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setTotalPages(1);
    load(1, true);
    return () => controller.current?.abort();
  }, [load]);

  const hasMore = page < totalPages;
  const loadMore = useCallback(() => {
    if (!loading && hasMore) load(page + 1, false);
  }, [loading, hasMore, page, load]);
  const retry = useCallback(
    () => load(movies.length ? page + 1 : 1, movies.length === 0),
    [load, movies.length, page]
  );

  return { movies, loading, error, hasMore, loadMore, retry, mode };
}