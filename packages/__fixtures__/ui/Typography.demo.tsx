import { Box, Grid, Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import { startCase } from 'lodash';
import React from 'react';

const colors: Array<TypographyProps['color']> = [
  'textPrimary',
  'textSecondary',
  'primary',
  'error',
];

const variants: Array<TypographyProps['variant']> = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
];

export default function TypographyDemo() {
  return (
    <Box padding={2}>
      <Grid container={true} spacing={1} direction="column">
        {colors.map(color => (
          <Grid key={color} item={true}>
            <Grid container={true} spacing={1}>
              {variants.map(variant => (
                <Grid key={variant} item={true} xs={12}>
                  <Typography color={color} variant={variant}>
                    <code>{variant}</code> {startCase(color)}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
