import { Grid, Skeleton } from '@mui/material';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies, loading }) {
  const showSkeleton = loading && movies.length === 0;
  return (
    <Grid container spacing={{ xs: 1.5, md: 2.5 }}>
      {showSkeleton
        ? Array.from({ length: 12 }).map((_, i) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
              <Skeleton variant="rounded" sx={{ aspectRatio: '2 / 3.4', height: 'auto' }} />
            </Grid>
          ))
        : movies.map((m) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={m.id}>
              <MovieCard movie={m} />
            </Grid>
          ))}
    </Grid>
  );
}