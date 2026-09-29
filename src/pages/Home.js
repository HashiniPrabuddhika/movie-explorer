import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, CircularProgress, Chip, Stack } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import HistoryIcon from '@mui/icons-material/History';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import QuickPicks from '../components/QuickPicks';
import FilterBar from '../components/FilterBar';
import MovieGrid from '../components/MovieGrid';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import useDebounce from '../hooks/useDebounce';
import useMovies from '../hooks/useMovies';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import usePageTitle from '../hooks/usePageTitle';
import { useMovieContext } from '../context/MovieContext';
import { EMPTY_FILTERS, MIN_QUERY_LENGTH, SEARCH_DEBOUNCE_MS } from '../constants';

const HEADINGS = { trending: 'Trending this week', discover: 'Filtered movies' };

export default function Home() {
  usePageTitle('Discover movies');
  const { lastSearch, setLastSearch } = useMovieContext();
  const [input, setInput] = useState('');
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const debounced = useDebounce(input.trim(), SEARCH_DEBOUNCE_MS);
  const query = debounced.length >= MIN_QUERY_LENGTH ? debounced : '';

  useEffect(() => {
    if (query) setLastSearch(query); // persist the last search
  }, [query, setLastSearch]);

  const { movies, loading, error, hasMore, loadMore, retry, mode } = useMovies({ query, ...filters });
  const sentinelRef = useInfiniteScroll(loadMore, mode === 'search' && hasMore && !error && !loading);

  const toggleGenre = useCallback(
    (id) => setFilters((f) => ({ ...f, genre: f.genre === id ? '' : id })),
    []
  );
  const heading = mode === 'search' ? `Results for “${query}”` : HEADINGS[mode];

  return (
    <Box>
      <Hero>
        <SearchBar value={input} onChange={setInput} />
        <QuickPicks selected={filters.genre} onSelect={toggleGenre} />
        {lastSearch && !input && (
          <Chip
            icon={<HistoryIcon />}
            label={`Last search: ${lastSearch}`}
            onClick={() => setInput(lastSearch)}
            onDelete={() => setLastSearch('')}
            sx={{ mt: 2, color: '#fff', borderColor: 'rgba(255,255,255,.55)', '& .MuiChip-icon, & .MuiChip-deleteIcon': { color: '#fff' } }}
            variant="outlined"
          />
        )}
      </Hero>

      <Box sx={{ my: 3 }}>
        <FilterBar filters={filters} onChange={setFilters} sortDisabled={mode === 'search'} />
      </Box>

      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2.5 }}>
        {mode === 'trending' && <WhatshotIcon color="secondary" />}
        <Typography variant="h5" component="h2" fontWeight={800}>{heading}</Typography>
      </Stack>

      <MovieGrid movies={movies} loading={loading} />

      {error && <ErrorMessage message={error} onRetry={retry} />}

      {!loading && !error && movies.length === 0 && (
        <EmptyState
          icon={<SearchOffIcon />}
          title="No movies found"
          subtitle="Try a different search or adjust the filters."
          action={<Button variant="outlined" onClick={() => { setInput(''); setFilters(EMPTY_FILTERS); }}>Reset search</Button>}
        />
      )}

      {mode === 'search' && <div ref={sentinelRef} style={{ height: 1 }} />}

      {loading && movies.length > 0 && (
        <Box sx={{ textAlign: 'center', my: 3 }}><CircularProgress /></Box>
      )}

      {mode !== 'search' && hasMore && movies.length > 0 && !error && (
        <Box sx={{ textAlign: 'center', my: 5 }}>
          <Button variant="contained" size="large" onClick={loadMore} disabled={loading} sx={{ px: 5 }}>
            {loading ? 'Loading...' : 'Load more'}
          </Button>
        </Box>
      )}
    </Box>
  );
}