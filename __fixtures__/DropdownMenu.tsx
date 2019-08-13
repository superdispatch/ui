import React, { useRef, useState } from 'react';
import { Box, Menu, MenuItem } from '@material-ui/core';
import { ThemeProvider } from '@superdispatch/ui/src/theme/ThemeProvider';
import { Button } from '../packages/ui/src';

export default {
  Demo() {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <ThemeProvider>
        <Box padding={2}>
          <Button ref={buttonRef} variant="contained" onClick={() => setOpen(true)}>
            Menu
          </Button>

          <Menu open={open} onClose={() => setOpen(false)} anchorEl={buttonRef.current}>
            <MenuItem
              onClick={() => {
                setOpen(false);

                // eslint-disable-next-line no-alert
                window.alert('Opening profile...');
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpen(false);

                // eslint-disable-next-line no-alert
                window.alert('Opening account...');
              }}
            >
              My account
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpen(false);

                // eslint-disable-next-line no-alert
                window.alert('Logging out...');
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </ThemeProvider>
    );
  },
};
