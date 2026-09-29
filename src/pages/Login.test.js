import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from './Login';

const renderLogin = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  );

beforeEach(() => localStorage.clear());

test('shows an error for wrong credentials', () => {
  renderLogin();
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'bad' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrong' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
  expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
});

test('shows validation error when fields are empty', () => {
  renderLogin();
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
  expect(screen.getByText(/please enter both/i)).toBeInTheDocument();
});

test('logs in with valid credentials', () => {
  renderLogin();
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'admin' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'movie123' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
  expect(JSON.parse(localStorage.getItem('me_user')).username).toBe('admin');
});