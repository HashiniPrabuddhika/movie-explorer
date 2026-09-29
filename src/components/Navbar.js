import { Link as RouterLink, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Tooltip, Badge, Box, Avatar, alpha } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { useColorMode } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useMovieContext } from '../context/MovieContext';
import { BRAND } from '../theme/brand';

const linkSx = {
  '&.active': { color: 'primary.main', bgcolor: (t) => alpha(t.palette.primary.main, 0.14) },
};

export default function Navbar() {
  const { mode, toggle } = useColorMode();
  const { user, logout } = useAuth();
  const { favorites } = useMovieContext();

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        backdropFilter: 'blur(14px)',
        bgcolor: (t) => alpha(t.palette.background.default, 0.75),
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
        color: 'text.primary',
      }}
    >
      <Toolbar>
        <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }}>
          <MovieFilterIcon color="primary" />
          <Typography
            variant="h6"
            fontWeight={800}
            sx={{ background: BRAND.gradientText, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Movie Explorer
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title="Home">
          <IconButton component={NavLink} to="/" end aria-label="Home" sx={linkSx}><HomeIcon /></IconButton>
        </Tooltip>
        <Tooltip title="Favorites">
          <IconButton component={NavLink} to="/favorites" aria-label="Favorites" sx={linkSx}>
            <Badge badgeContent={favorites.length} color="secondary"><FavoriteIcon /></Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
          <IconButton onClick={toggle} aria-label="Toggle light or dark mode">
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Log out">
          <IconButton onClick={logout} aria-label="Log out"><LogoutIcon /></IconButton>
        </Tooltip>
        <Avatar sx={{ ml: 1, width: 34, height: 34, bgcolor: 'primary.main', display: { xs: 'none', sm: 'flex' } }}>
          {user?.username?.[0]?.toUpperCase()}
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}