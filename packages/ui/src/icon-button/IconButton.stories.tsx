import { IconButton } from '@material-ui/core';
import { Save as SaveIcon } from '@material-ui/icons';
import { PropsLink } from '@superdispatch/ui-docs';

import { Inline } from '..';

export default {
  title: 'Inputs/IconButton',
  parameters: {
    componentSubtitle: (
      <PropsLink url="https://material-ui.com/api/icon-button/#props" />
    ),
  },
};

export const basic = () => (
  <IconButton>
    <SaveIcon />
  </IconButton>
);

export const disabled = () => (
  <IconButton disabled={true}>
    <SaveIcon />
  </IconButton>
);

export const colors = () => (
  <Inline>
    <IconButton>
      <SaveIcon />
    </IconButton>

    <IconButton color="primary">
      <SaveIcon />
    </IconButton>

    <IconButton color="inherit">
      <SaveIcon />
    </IconButton>
  </Inline>
);

export const sizes = () => (
  <Inline verticalAlign="center">
    <IconButton size="small">
      <SaveIcon fontSize="inherit" />
    </IconButton>

    <IconButton>
      <SaveIcon fontSize="inherit" />
    </IconButton>
  </Inline>
);
