import PropTypes from 'prop-types';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export default function SearchBar({ value, onChange }) {
  return (
    <Box role="search">
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies, e.g. Inception"
        inputProps={{ 'aria-label': 'Search movies' }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 999,
            bgcolor: 'background.paper',
            boxShadow: 6,
            fontSize: { xs: 15, md: 17 },
            '& fieldset': { borderColor: 'transparent' },
            '&:hover fieldset': { borderColor: 'secondary.light' },
            '&.Mui-focused fieldset': { borderColor: 'secondary.main', borderWidth: 2 },
          },
          '& .MuiOutlinedInput-input': { py: { xs: 1.5, md: 2 } },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton aria-label="Clear search" onClick={() => onChange('')} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

SearchBar.propTypes = { value: PropTypes.string.isRequired, onChange: PropTypes.func.isRequired };
