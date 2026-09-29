import { Dialog, DialogTitle, DialogContent, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function TrailerDialog({ open, onClose, videoKey, title }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ pr: 6 }}>
        {title} – Trailer
        <IconButton aria-label="Close trailer" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: 'relative', pt: '56.25%' }}>
          {open && (
            <iframe
              title={`${title} trailer`}
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}