import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  Stack,
  Button,
  Avatar,
  Skeleton,
  Rating,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { fetchMovieDetails, fetchSimilarMovies, imageUrl, getErrorMessage } from '../api/tmdb';
import ErrorMessage from '../components/ErrorMessage';
import TrailerDialog from '../components/TrailerDialog';
import MovieRow from '../components/MovieRow';
import useFavorite from '../hooks/useFavorite';
import usePageTitle from '../hooks/usePageTitle';
import { useNotify } from '../context/NotifyContext';

const formatRuntime = (m) => (m ? `${Math.floor(m / 60)}h ${m % 60}m` : 'N/A');

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotify();

  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerOpen, setTrailerOpen] = useState(false);

  const { fav, toggle: toggleFav } = useFavorite(movie);
  usePageTitle(movie?.title);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [data, sim] = await Promise.all([
        fetchMovieDetails(id),
        fetchSimilarMovies(id).catch(() => []), 
      ]);
      setMovie(data);
      setSimilar(sim);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
    window.scrollTo(0, 0);
  }, [load]);

  if (loading) return <Skeleton variant="rounded" height={420} />;

  if (error) {
    return (
      <>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Back
        </Button>
        <ErrorMessage message={error} onRetry={load} />
      </>
    );
  }

  const videos = movie.videos?.results || [];
  const trailer =
    videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
    videos.find((v) => v.site === 'YouTube');
  const cast = movie.credits?.cast?.slice(0, 12) || [];
  const backdrop = imageUrl(movie.backdrop_path, 'w1280');
  const poster = imageUrl(movie.poster_path, 'w500');

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: movie.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        notify('Link copied to clipboard');
      }
    } catch {
    }
  };

  return (
    <Box sx={{ mx: { xs: -2, md: -3 }, mt: { xs: -2, md: -4 } }}>
      <Box
        sx={{
          color: '#fff',
          bgcolor: '#111',
          py: { xs: 3, md: 6 },
          backgroundImage: backdrop
            ? `linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.88)), url(${backdrop})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Button
            color="inherit"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ mb: 2 }}
          >
            Back
          </Button>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              {poster ? (
                <Box
                  component="img"
                  src={poster}
                  alt={`${movie.title} poster`}
                  sx={{
                    width: '100%',
                    maxWidth: 320,
                    borderRadius: 3,
                    display: 'block',
                    mx: 'auto',
                    boxShadow: 8,
                  }}
                />
              ) : (
                <Skeleton variant="rounded" height={420} animation={false} />
              )}
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h4" component="h1" fontWeight={800}>
                {movie.title}{' '}
                {movie.release_date && (
                  <Typography component="span" variant="h5" sx={{ opacity: 0.7 }}>
                    ({movie.release_date.slice(0, 4)})
                  </Typography>
                )}
              </Typography>
              {movie.tagline && (
                <Typography sx={{ fontStyle: 'italic', opacity: 0.8, mt: 0.5 }}>
                  {movie.tagline}
                </Typography>
              )}

              <Stack direction="row" spacing={1} alignItems="center" sx={{ my: 2 }}>
                <Rating value={(movie.vote_average || 0) / 2} precision={0.1} readOnly />
                <Typography>
                  {movie.vote_average?.toFixed(1)} / 10 ({movie.vote_count} votes)
                </Typography>
              </Stack>

              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
                {movie.genres?.map((g) => (
                  <Chip
                    key={g.id}
                    label={g.name}
                    variant="outlined"
                    sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.5)' }}
                  />
                ))}
              </Stack>

              <Typography variant="body2" sx={{ mb: 2, opacity: 0.85 }}>
                Runtime: {formatRuntime(movie.runtime)} &nbsp;•&nbsp; Released:{' '}
                {movie.release_date || 'N/A'} &nbsp;•&nbsp; Language:{' '}
                {movie.original_language?.toUpperCase()}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Overview
              </Typography>
              <Typography sx={{ mb: 3, lineHeight: 1.7 }}>
                {movie.overview || 'No overview available.'}
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {trailer && (
                  <Button
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => setTrailerOpen(true)}
                  >
                    Watch trailer
                  </Button>
                )}
                {trailer && (
                  <Button
                    variant="outlined"
                    color="inherit"
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open on YouTube
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  onClick={toggleFav}
                >
                  {fav ? 'Remove from favorites' : 'Add to favorites'}
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<ShareIcon />}
                  onClick={handleShare}
                >
                  Share
                </Button>
              </Stack>

              {!trailer && (
                <Typography variant="body2" sx={{ mt: 2, opacity: 0.7 }}>
                  No trailer available for this movie.
                </Typography>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Top cast
        </Typography>
        {cast.length === 0 ? (
          <Typography color="text.secondary">Cast information is not available.</Typography>
        ) : (
          <Stack direction="row" spacing={3} sx={{ overflowX: 'auto', pb: 2 }}>
            {cast.map((c) => (
              <Box key={c.id} sx={{ textAlign: 'center', minWidth: 96 }}>
                <Avatar
                  src={imageUrl(c.profile_path, 'w185')}
                  alt={c.name}
                  sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                />
                <Typography variant="body2" fontWeight={600} noWrap>
                  {c.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap display="block">
                  {c.character}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}

        <MovieRow title="More like this" movies={similar} />
      </Container>

      {trailer && (
        <TrailerDialog
          open={trailerOpen}
          onClose={() => setTrailerOpen(false)}
          videoKey={trailer.key}
          title={movie.title}
        />
      )}
    </Box>
  );
}