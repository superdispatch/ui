import { Button, Menu, MenuItem } from '@material-ui/core';
import { InlineGrid } from '@superdispatch/ui';
import React, { useRef, useState } from 'react';

const options = ['Profile', 'My account', 'Logout'];

function Demo({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        color="primary"
        ref={buttonRef}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        {label}
      </Button>

      <Menu
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={buttonRef.current}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              setOpen(false);

              // eslint-disable-next-line no-alert
              window.alert(`Opening "${option}"`);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default function MenuDemo() {
  return (
    <InlineGrid spacing={2} justify="space-between">
      <Demo label="Left" />

      <Demo label="Right" />
    </InlineGrid>
  );
}
