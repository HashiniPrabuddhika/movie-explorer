import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MovieProvider } from '../context/MovieContext';
import MovieCard from './MovieCard';

const movie = { id: 1, title: 'Inception', release_date: '2010-07-16', vote_average: 8.36, poster_path: '/x.jpg' };

const renderCard = () =>
  render(
    <MemoryRouter>
      <MovieProvider>
        <MovieCard movie={movie} />
      </MovieProvider>
    </MemoryRouter>
  );

beforeEach(() => localStorage.clear());

test('shows title, release year and rating', () => {
  renderCard();
  expect(screen.getByText('Inception')).toBeInTheDocument();
  expect(screen.getByText('2010')).toBeInTheDocument();
  expect(screen.getByText('8.4')).toBeInTheDocument();
});

test('toggling favorite saves the movie to localStorage', () => {
  renderCard();
  fireEvent.click(screen.getByRole('button', { name: /add to favorites/i }));
  expect(screen.getByRole('button', { name: /remove from favorites/i })).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem('me_favorites'))).toHaveLength(1);
});
