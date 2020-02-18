import {
  Card,
  CardContent,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Switch,
} from '@material-ui/core';
import { Call } from '@material-ui/icons';
import { GridStack, useSnackbarStack } from '@superdispatch/ui';
import React, { useState } from 'react';

export default function ChipDemo() {
  const [disabled, setDisabled] = useState(false);
  const [hasIcon, setHasIcon] = useState(false);
  const { addSnackbar } = useSnackbarStack();
  const icon = hasIcon ? <Call /> : undefined;

  return (
    <GridStack spacing={2}>
      <FormControl>
        <FormLabel>State</FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            label="Disabled"
            control={<Switch />}
            checked={disabled}
            onChange={(_, checked) => setDisabled(checked)}
          />
          <FormControlLabel
            label="With Icon"
            control={<Switch />}
            checked={hasIcon}
            onChange={(_, checked) => setHasIcon(checked)}
          />
        </FormGroup>
      </FormControl>

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
    </GridStack>
  );
}
