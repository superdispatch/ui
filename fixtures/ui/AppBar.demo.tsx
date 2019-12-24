import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ArrowBack, Menu } from '@material-ui/icons';
import React from 'react';

export default function AppBarDemo() {
  return (
    <Box padding={2}>
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
              <IconButton edge="end" aria-label="open menu">
                <Menu />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
