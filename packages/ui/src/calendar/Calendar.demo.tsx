import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  Switch,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import React, { useMemo, useState } from 'react';

import { Calendar } from '..';

export function CalendarDemo() {
  const [disabled, setDisabled] = useState(false);
  const [hasFooter, setHasFooter] = useState(false);

  const today = useMemo(
    () =>
      moment()
        .startOf('day')
        .toDate(),
    [],
  );

  return (
    <Box p={2}>
      <Grid container={true} spacing={1}>
        <Grid item={true} sm={true} xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">State</FormLabel>
            <FormGroup row={true}>
              <FormControlLabel
                label="Disabled"
                control={<Switch />}
                checked={disabled}
                onChange={(_, checked) => setDisabled(checked)}
              />

              <FormControlLabel
                label="With Footer"
                control={<Switch />}
                checked={hasFooter}
                onChange={(_, checked) => setHasFooter(checked)}
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>

      <Box display="flex">
        <Paper elevation={8}>
          <Calendar
            disabledDays={!disabled ? undefined : { before: today }}
            footer={hasFooter && <Typography color="textSecondary">Footer helper text</Typography>}
          />
        </Paper>
      </Box>
    </Box>
  );
}
