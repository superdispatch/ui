import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ArrowBack, Close } from '@material-ui/icons';
import React from 'react';

export default function AppBarDemo() {
  return (
    <AppBar>
      <Toolbar>
        <Grid container={true} spacing={1} alignItems="center">
          <Grid item={true}>
            <IconButton edge="start" aria-label="back">
              <ArrowBack />
            </IconButton>
          </Grid>

          <Grid item={true} xs={true}>
            <Typography variant="h2">App Bar</Typography>
          </Grid>

          <Grid item={true}>
            <IconButton edge="end" aria-label="close">
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
