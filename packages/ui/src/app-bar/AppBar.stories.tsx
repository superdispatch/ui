import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { ArrowBack, Close } from '@material-ui/icons';
import { Meta } from '@storybook/react';
import { PropsLink } from '@superdispatch/ui-docs';
import { Column, Columns } from '..';

export default {
  title: 'Surfaces/AppBar',
  parameters: {
    componentSubtitle: (
      <PropsLink url="https://material-ui.com/api/app-bar/#props" />
    ),
  },
} as Meta;

export const basic = () => (
  <AppBar>
    <Toolbar>
      <Columns align="center">
        <Column width="content">
          <IconButton edge="start" aria-label="back">
            <ArrowBack />
          </IconButton>
        </Column>

        <Column>
          <Typography variant="h2">App Bar</Typography>
        </Column>

        <Column width="content">
          <IconButton edge="end" aria-label="close">
            <Close />
          </IconButton>
        </Column>
      </Columns>
    </Toolbar>
  </AppBar>
);

export const dense = () => (
  <AppBar>
    <Toolbar variant="dense">
      <Columns align="center">
        <Column width="content">
          <IconButton edge="start" aria-label="back">
            <ArrowBack />
          </IconButton>
        </Column>

        <Column>
          <Typography variant="h2">App Bar</Typography>
        </Column>

        <Column width="content">
          <IconButton edge="end" aria-label="close">
            <Close />
          </IconButton>
        </Column>
      </Columns>
    </Toolbar>
  </AppBar>
);
