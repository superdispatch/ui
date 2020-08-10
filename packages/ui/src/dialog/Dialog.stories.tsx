import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { PropsLink } from '@superdispatch/ui-docs';
import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import { UseState } from '@superdispatch/ui-playroom/UseState';
import React from 'react';

import { Button } from '..';
import { Dialog } from './Dialog.playroom';

export default {
  title: 'Feedback/Dialog',
  parameters: {
    componentSubtitle: (
      <PropsLink url="https://material-ui.com/api/dialog/#props" />
    ),
  },
};

export const basic = makePlayroomStory(
  <UseState
    initialState={false}
    render={(open, setOpen) => (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>

        <Dialog open={open} disablePortal={true} onClose={() => setOpen(false)}>
          <DialogTitle>Use Google’s location service?</DialogTitle>
          <DialogContent>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Disagree</Button>
            <Button onClick={() => setOpen(false)} variant="contained">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )}
  />,
);
