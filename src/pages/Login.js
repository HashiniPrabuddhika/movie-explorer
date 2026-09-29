import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, TextField, Button, Alert, InputAdornment, IconButton, Paper } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAuth, DEMO_USER } from '../context/AuthContext';
import { useColorMode } from '../context/ThemeContext';
import usePageTitle from '../hooks/usePageTitle';
import { BRAND, heroBackgroundSx } from '../theme/brand';

export default function Login() {
  usePageTitle('Sign in');
  const { user, login } = useAuth();
  const { mode, toggle } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  if (user) return <Navigate to={from} replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password) return setError('Please enter both username and password.');
    const result = login(username.trim(), password);
    if (result.ok) navigate(from, { replace: true });
    else setError(result.message);
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid
        item md={6}
        sx={{
          display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'center',
          p: 8, color: '#fff',
          ...heroBackgroundSx(),
        }}
      >
        <MovieFilterIcon sx={{ fontSize: 72, mb: 2 }} />
        <Typography variant="h3" fontWeight={800}>Movie Explorer</Typography>
        <Typography variant="h6" sx={{ mt: 2, opacity: 0.9, fontWeight: 400, maxWidth: 420 }}>
          Discover trending films, explore cast and trailers, and keep a watchlist of your favorites.
        </Typography>
      </Grid>

      <Grid item xs={12} md={6} sx={{ display: 'grid', placeItems: 'center', p: 2, position: 'relative' }}>
        <IconButton onClick={toggle} aria-label="Toggle light or dark mode" sx={{ position: 'absolute', top: 16, right: 16 }}>
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, width: '100%', maxWidth: 420, bgcolor: 'transparent' }}>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1, mb: 3 }}>
            <MovieFilterIcon color="primary" />
            <Typography variant="h6" fontWeight={800} sx={{ background: BRAND.gradientText, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Movie Explorer
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={800}>Welcome back</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Sign in to continue</Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
              label="Username" fullWidth required margin="normal" autoFocus autoComplete="username"
              value={username} onChange={(e) => { setUsername(e.target.value); setError(''); }}
            />
            <TextField
              label="Password" fullWidth required margin="normal" autoComplete="current-password"
              type={show ? 'text' : 'password'}
              value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle visibility" onClick={() => setShow((s) => !s)} edge="end">
                      {show ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2, py: 1.4 }}>Sign in</Button>
          </Box>

          <Alert severity="info" sx={{ mt: 3 }}>
            Demo account: <b>{DEMO_USER.username}</b> / <b>{DEMO_USER.password}</b>
          </Alert>
        </Paper>
      </Grid>
    </Grid>
  );
}