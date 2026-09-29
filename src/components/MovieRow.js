import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import MovieCard from './MovieCard';

export default function MovieRow({ title, movies }) {
  if (!movies?.length) return null;
  return (
    <Box component="section" sx={{ mt: 5 }}>
      <Typography variant="h5" component="h2" fontWeight={700} sx={{ mb: 2 }}>{title}</Typography>
      <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 4, pt: 1, scrollSnapType: 'x proximity' }}>
        {movies.map((m) => (
          <Box key={m.id} sx={{ flex: '0 0 auto', width: { xs: 140, sm: 170 }, scrollSnapAlign: 'start' }}>
            <MovieCard movie={m} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

MovieRow.propTypes = { title: PropTypes.string.isRequired, movies: PropTypes.array };