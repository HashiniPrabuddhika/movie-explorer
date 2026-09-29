import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, MenuItem, Button, Paper, Typography, Stack } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { fetchGenres, isCancel } from '../api/tmdb';
import { EMPTY_FILTERS, SORT_OPTIONS } from '../constants';

const thisYear = new Date().getFullYear();
const years = Array.from({ length: 40 }, (_, i) => thisYear - i);
const ratings = [5, 6, 7, 8, 9];

const selectProps = {
  select: true,
  size: 'small',
  fullWidth: true,
  InputLabelProps: { shrink: true },
  SelectProps: { displayEmpty: true },
};

export default function FilterBar({ filters, onChange, sortDisabled }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchGenres(ctrl.signal)
      .then(setGenres)
      .catch((err) => {
        if (!isCancel(err)) setGenres([]);
      });
    return () => ctrl.abort();
  }, []);

  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });
  const active = Boolean(filters.genre || filters.year || filters.rating || filters.sort);

  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <TuneIcon color="primary" fontSize="small" />
        <Typography variant="subtitle1" component="h2" fontWeight={700}>
          Refine your picks
        </Typography>
      </Stack>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6} md={3}>
          <TextField {...selectProps} label="Genre" value={filters.genre} onChange={set('genre')}>
            <MenuItem value="">All genres</MenuItem>
            {genres.map((g) => (
              <MenuItem key={g.id} value={String(g.id)}>
                {g.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} md={2}>
          <TextField {...selectProps} label="Year" value={filters.year} onChange={set('year')}>
            <MenuItem value="">Any year</MenuItem>
            {years.map((y) => (
              <MenuItem key={y} value={String(y)}>
                {y}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} md={2}>
          <TextField {...selectProps} label="Min rating" value={filters.rating} onChange={set('rating')}>
            <MenuItem value="">Any rating</MenuItem>
            {ratings.map((r) => (
              <MenuItem key={r} value={String(r)}>
                {r}+ ★
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            {...selectProps}
            label="Sort by"
            value={filters.sort}
            onChange={set('sort')}
            disabled={sortDisabled}
            helperText={sortDisabled ? 'Not available while searching' : undefined}
          >
            <MenuItem value="">Default</MenuItem>
            {SORT_OPTIONS.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FilterAltOffIcon />}
            disabled={!active}
            onClick={() => onChange(EMPTY_FILTERS)}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

FilterBar.propTypes = {
  filters: PropTypes.shape({
    genre: PropTypes.string,
    year: PropTypes.string,
    rating: PropTypes.string,
    sort: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  sortDisabled: PropTypes.bool,
};

FilterBar.defaultProps = { sortDisabled: false };
