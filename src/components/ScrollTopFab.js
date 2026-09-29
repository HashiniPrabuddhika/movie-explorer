import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ScrollTopFab() {
  const visible = useScrollTrigger({ disableHysteresis: true, threshold: 400 });
  return (
    <Zoom in={visible}>
      <Fab
        color="primary"
        size="medium"
        aria-label="Scroll back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}