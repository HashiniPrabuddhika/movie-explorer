import { createContext, useContext, useMemo, useCallback } from 'react';
import { ThemeProvider, createTheme, CssBaseline, useMediaQuery } from '@mui/material';
import useLocalStorage from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../constants';
import { BRAND } from '../theme/brand';

const ColorModeContext = createContext({ mode: 'light', toggle: () => {} });
export const useColorMode = () => useContext(ColorModeContext);

const buildTheme = (mode) => {
  const dark = mode === 'dark';
  return createTheme({
    palette: {
      mode,
      primary: { main: dark ? BRAND.redLight : BRAND.red },
      secondary: { main: dark ? BRAND.pinkLight : BRAND.pink },
      background: {
        default: dark ? '#12070b' : '#fff5f7',
        paper: dark ? '#1c0d13' : '#ffffff',
      },
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: '"Poppins","Roboto","Helvetica","Arial",sans-serif',
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          html { scroll-behavior: smooth; }
          @media (prefers-reduced-motion: reduce) {
            * { transition: none !important; animation: none !important; scroll-behavior: auto !important; }
          }
        `,
      },
      MuiButton: { styleOverrides: { root: { borderRadius: 999 } } },
      MuiCard: { styleOverrides: { root: { backgroundImage: 'none' } } },
      MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
    },
  });
};

export function AppThemeProvider({ children }) {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useLocalStorage(STORAGE_KEYS.mode, prefersDark ? 'dark' : 'light');
  const toggle = useCallback(() => setMode((m) => (m === 'light' ? 'dark' : 'light')), [setMode]);
  const theme = useMemo(() => buildTheme(mode), [mode]);
  const value = useMemo(() => ({ mode, toggle }), [mode, toggle]);

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
