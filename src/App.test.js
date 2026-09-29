import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppThemeProvider } from './context/ThemeContext';
import { NotifyProvider } from './context/NotifyContext';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import App from './App';

beforeEach(() => localStorage.clear());

test('redirects signed-out visitors to the sign-in page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <AppThemeProvider>
        <NotifyProvider>
          <AuthProvider>
            <MovieProvider>
              <App />
            </MovieProvider>
          </AuthProvider>
        </NotifyProvider>
      </AppThemeProvider>
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
});
