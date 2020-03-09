import { Card, CardContent, Chip, Grid } from '@material-ui/core';
import { Call } from '@material-ui/icons';
import { boolean } from '@storybook/addon-knobs';
import { useSnackbarStack } from '@superdispatch/ui';
import React from 'react';

export default function ChipDemo() {
  const disabled = boolean('Disabled', false);
  const hasIcon = boolean('With Icon', false);
  const { addSnackbar } = useSnackbarStack();
  const icon = hasIcon ? <Call /> : undefined;

  return (
    <Card>
      <CardContent>
        <Grid container={true} spacing={2}>
          <Grid item={true}>
            <Chip label="Basic" icon={icon} disabled={disabled} />
          </Grid>

          <Grid item={true}>
            <Chip
              label="Clickable"
              clickable={true}
              icon={icon}
              disabled={disabled}
              onClick={() => addSnackbar('Clicked', { variant: 'success' })}
            />
          </Grid>

          <Grid item={true}>
            <Chip
              label="Delete"
              icon={icon}
              disabled={disabled}
              onDelete={() => {
                addSnackbar('Delete clicked', { variant: 'error' });
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
