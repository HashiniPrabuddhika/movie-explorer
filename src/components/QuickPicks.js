import PropTypes from 'prop-types';
import { Chip, Stack, Typography } from '@mui/material';
import { QUICK_GENRES } from '../constants';

export default function QuickPicks({ selected, onSelect }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      flexWrap="wrap"
      gap={1}
      role="group"
      aria-label="Quick genre picks"
      sx={{ mt: 2 }}
    >
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,.85)', mr: 0.5 }}>
        Quick picks:
      </Typography>
      {QUICK_GENRES.map(({ id, label }) => {
        const active = selected === id;
        return (
          <Chip
            key={id}
            label={label}
            size="small"
            clickable
            aria-pressed={active}
            onClick={() => onSelect(id)}
            variant={active ? 'filled' : 'outlined'}
            color={active ? 'secondary' : 'default'}
            sx={{
              color: '#fff',
              borderColor: 'rgba(255,255,255,.55)',
              bgcolor: active ? undefined : 'rgba(255,255,255,.08)',
              '&:hover': { bgcolor: active ? undefined : 'rgba(255,255,255,.2)' },
            }}
          />
        );
      })}
    </Stack>
  );
}

QuickPicks.propTypes = {
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

QuickPicks.defaultProps = { selected: '' };
