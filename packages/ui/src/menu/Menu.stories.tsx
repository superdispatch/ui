import { Button, Menu, MenuItem } from '@material-ui/core';
import { Meta } from '@storybook/react';
import { UseState } from '@superdispatch/ui-docs';
import React from 'react';

export default { title: 'Navigation/Menu' } as Meta;

export const basic = () => (
  <UseState
    initialState={null}
    render={(state, setState) => (
      <>
        <Button
          color="primary"
          variant="contained"
          onClick={(event) => setState(event.currentTarget)}
        >
          Menu
        </Button>

        <Menu open={!!state} anchorEl={state} onClose={() => setState(false)}>
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Menu>
      </>
    )}
  />
);
