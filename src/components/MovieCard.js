import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MovieIcon from '@mui/icons-material/Movie';
import { imageUrl } from '../api/tmdb';
import { BRAND } from '../theme/brand';
import useFavorite from '../hooks/useFavorite';

function MovieCard({ movie }) {
  const { fav, toggle } = useFavorite(movie);
  const poster = imageUrl(movie.poster_path, 'w342');
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'NR';

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'visible',
        transition: 'transform .25s, box-shadow .25s',
        '&:hover': { transform: 'translateY(-6px)', boxShadow: 10 },
        '&:hover .poster': { transform: 'scale(1.06)' },
      }}
    >
      <CardActionArea component={RouterLink} to={`/movie/${movie.id}`} sx={{ display: 'block', borderRadius: 'inherit' }}>
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ overflow: 'hidden', borderRadius: '14px 14px 0 0', aspectRatio: '2 / 3', bgcolor: 'action.hover' }}>
            {poster ? (
              <Box
                component="img"
                className="poster"
                src={poster}
                alt={`${movie.title} poster`}
                loading="lazy"
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .4s ease' }}
              />
            ) : (
              <Box sx={{ height: '100%', display: 'grid', placeItems: 'center' }}>
                <MovieIcon sx={{ fontSize: 56, color: 'text.disabled' }} />
              </Box>
            )}
          </Box>
          <Box
            sx={{
              position: 'absolute', left: 10, bottom: -14, px: 1, py: 0.25, minWidth: 40, textAlign: 'center',
              borderRadius: 999, fontSize: 12, fontWeight: 700, color: '#fff', boxShadow: 3,
              background: BRAND.gradient, border: '2px solid', borderColor: 'background.paper',
            }}
          >
            <span aria-hidden="true">★ </span>
            <span>{rating}</span>
          </Box>
        </Box>
        <CardContent sx={{ pt: 3.5, px: 1.5, pb: 1.5 }}>
          <Typography
            variant="subtitle2"
            fontWeight={700}
            title={movie.title}
            sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.8em', lineHeight: 1.4 }}
          >
            {movie.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">{year}</Typography>
        </CardContent>
      </CardActionArea>

      <IconButton
        size="small"
        aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        onClick={toggle}
        sx={{
          position: 'absolute', top: 8, right: 8,
          bgcolor: BRAND.scrim, backdropFilter: 'blur(4px)',
          color: fav ? 'secondary.light' : '#fff',
          '&:hover': { bgcolor: BRAND.scrimStrong },
        }}
      >
        {fav ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
      </IconButton>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
};

export default memo(MovieCard);