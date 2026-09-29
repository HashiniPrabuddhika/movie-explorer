import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Button, Box, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import MovieGrid from '../components/MovieGrid';
import EmptyState from '../components/EmptyState';
import usePageTitle from '../hooks/usePageTitle';
import { useMovieContext } from '../context/MovieContext';
import { useNotify } from '../context/NotifyContext';

export default function Favorites() {
  usePageTitle('My favorites');
  const { favorites, clearFavorites } = useMovieContext();
  const { notify } = useNotify();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClear = () => {
    clearFavorites();
    setConfirmOpen(false);
    notify('Favorites cleared', 'info');
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight={800}>My favorites ({favorites.length})</Typography>
        {favorites.length > 0 && (
          <Button color="error" startIcon={<DeleteSweepIcon />} onClick={() => setConfirmOpen(true)}>Clear all</Button>
        )}
      </Stack>

      {favorites.length === 0 ? (
        <EmptyState
          icon={<FavoriteBorderIcon />}
          title="No favorites yet"
          subtitle="Tap the heart on any movie to save it here."
          action={<Button variant="contained" component={RouterLink} to="/">Browse movies</Button>}
        />
      ) : (
        <MovieGrid movies={favorites} loading={false} />
      )}

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Clear all favorites?</DialogTitle>
        <DialogContent>
          <DialogContentText>This removes all {favorites.length} saved movies from this device.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleClear}>Clear all</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}