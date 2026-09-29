import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', textAlign: 'center', p: 2 }}>
      <Box>
        <Typography variant="h2" fontWeight={800}>404</Typography>
        <Typography sx={{ mb: 2 }}>This page doesn't exist.</Typography>
        <Button variant="contained" component={RouterLink} to="/">Go home</Button>
      </Box>
    </Box>
  );
}