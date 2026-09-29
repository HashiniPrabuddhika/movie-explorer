import { Alert, Button } from '@mui/material';
import PropTypes from 'prop-types';

export default function ErrorMessage({ message, onRetry }) {

  ErrorMessage.propTypes = { message: PropTypes.string.isRequired, onRetry: PropTypes.func };
  return (
    <Alert
      severity="error"
      sx={{ my: 2 }}
      action={onRetry && <Button color="inherit" size="small" onClick={onRetry}>Retry</Button>}
    >
      {message}
    </Alert>
  );
}