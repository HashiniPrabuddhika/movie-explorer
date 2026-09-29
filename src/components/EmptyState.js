import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

export default function EmptyState({ icon, title, subtitle, action }) {
  return (
    <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
      <Box sx={{ color: 'text.disabled', '& svg': { fontSize: 72 } }}>{icon}</Box>
      <Typography variant="h6" fontWeight={700} sx={{ mt: 1 }}>{title}</Typography>
      {subtitle && <Typography color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>{subtitle}</Typography>}
      {action}
    </Box>
  );
}

EmptyState.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  action: PropTypes.node,
};