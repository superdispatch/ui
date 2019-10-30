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

import { Calendar, CalendarQuickSelection, CalendarQuickSelectionItem } from '..';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rtf1 = new (Intl as any).RelativeTimeFormat('en', { numeric: 'auto' });

export function CalendarDemo() {
  const [disabled, setDisabled] = useState(false);
  const [hasFooter, setHasFooter] = useState(false);
  const [hasQuickSelection, setHasQuickSelection] = useState(false);
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

              <FormControlLabel
                label="With Quick Selection"
                control={<Switch />}
                checked={hasQuickSelection}
                onChange={(_, checked) => setHasQuickSelection(checked)}
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
            quickSelection={
              hasQuickSelection && (
                <CalendarQuickSelection>
                  {Array.from({ length: 7 }, (_, idx) => (
                    <CalendarQuickSelectionItem key={idx}>
                      {rtf1.format(idx - 3, 'day')}
                    </CalendarQuickSelectionItem>
                  ))}
                </CalendarQuickSelection>
              )
            }
          />
        </Paper>
      </Box>
    </Box>
  );
}
