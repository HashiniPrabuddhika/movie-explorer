import { Component } from 'react';
import { Box, Typography, Button } from '@mui/material';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Unhandled UI error:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', textAlign: 'center', p: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>Something went wrong</Typography>
          <Typography color="text.secondary" sx={{ my: 2 }}>An unexpected error occurred. Please reload the page.</Typography>
          <Button variant="contained" onClick={() => window.location.assign('/')}>Reload app</Button>
        </Box>
      </Box>
    );
  }
}