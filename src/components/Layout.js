import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navbar from './Navbar';
import ScrollTopFab from './ScrollTopFab';

export default function Layout() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box
        component="a"
        href="#main"
        sx={{
          position: 'absolute', left: -9999,
          '&:focus': { left: 16, top: 16, zIndex: 2000, bgcolor: 'background.paper', p: 1.5, borderRadius: 2, boxShadow: 6 },
        }}
      >
        Skip to content
      </Box>
      <Navbar />
      <Container component="main" id="main" maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        <Outlet />
      </Container>
      <ScrollTopFab />
    </Box>
  );
}