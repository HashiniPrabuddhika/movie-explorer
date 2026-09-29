import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotifyContext = createContext({ notify: () => {} });
export const useNotify = () => useContext(NotifyContext);

export function NotifyProvider({ children }) {
  const [state, setState] = useState({ open: false, message: '', severity: 'success' });

  const notify = useCallback(
    (message, severity = 'success') => setState({ open: true, message, severity }),
    []
  );
  const close = (_, reason) => {
    if (reason !== 'clickaway') setState((s) => ({ ...s, open: false }));
  };
  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <NotifyContext.Provider value={value}>
      {children}
      <Snackbar
        open={state.open}
        autoHideDuration={2500}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={close} severity={state.severity} variant="filled" sx={{ width: '100%' }}>
          {state.message}
        </Alert>
      </Snackbar>
    </NotifyContext.Provider>
  );
}