import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { Button } from '@superdispatch/ui';
import React, { useState } from 'react';

export default function DialogDemo() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box padding={2}>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </Button>

      <Dialog open={isOpen}>
        <DialogTitle>
          <Typography variant="h3">Use Google’s location service?</Typography>
        </DialogTitle>
        <DialogContent>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setIsOpen(false)}
          >
            Disagree
          </Button>

          <Button
            color="primary"
            autoFocus={true}
            variant="contained"
            onClick={() => setIsOpen(false)}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
