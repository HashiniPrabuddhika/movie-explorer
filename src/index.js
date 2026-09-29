import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppThemeProvider } from './context/ThemeContext';
import { NotifyProvider } from './context/NotifyContext';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppThemeProvider>
        <ErrorBoundary>
          <NotifyProvider>
            <AuthProvider>
              <MovieProvider>
                <App />
              </MovieProvider>
            </AuthProvider>
          </NotifyProvider>
        </ErrorBoundary>
      </AppThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);