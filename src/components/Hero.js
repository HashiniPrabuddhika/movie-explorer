import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { BRAND, heroBackgroundSx } from '../theme/brand';

export default function Hero({ children }) {
  return (
    <Box
      component="section"
      aria-labelledby="hero-title"
      sx={{
        ...heroBackgroundSx(),
        borderRadius: 1,
        color: '#fff',
        px: { xs: 0, md: 2 },
        py: { xs: 5, md: 9 },
        boxShadow: 6,
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          py: 0.5,
          mb: 2,
          borderRadius: 999,
          bgcolor: BRAND.scrim,
          border: '1px solid rgba(255,255,255,.25)',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 0.4,
        }}
      >
        <MovieFilterIcon sx={{ fontSize: 18, color: 'secondary.light' }} />
        Your personal cinema guide
      </Box>

      <Typography
        id="hero-title"
        component="h1"
        fontWeight={800}
        sx={{ fontSize: { xs: '2rem', md: '3.2rem' }, lineHeight: 1.15, textShadow: '0 2px 12px rgba(0,0,0,.35)' }}
      >
        Find your next{' '}
        <Box
          component="span"
          sx={{
            background: BRAND.gradientTextOnDark,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          favorite film
        </Box>
      </Typography>

      <Typography sx={{ mt: 1.5, mb: 3.5, maxWidth: 560, color: 'rgba(255,255,255,.9)' }}>
        Search millions of movies, watch trailers and build your own watchlist.
      </Typography>

      <Box sx={{ maxWidth: 680 }}>{children}</Box>
    </Box>
  );
}

Hero.propTypes = { children: PropTypes.node };
