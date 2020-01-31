import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Switch,
  Typography,
} from '@material-ui/core';
import {
  Calendar,
  CalendarProps,
  CalendarQuickSelection,
  CalendarQuickSelectionItem,
  useDateUtils,
} from '@superdispatch/dates';
import { startCase } from 'lodash';
import React, { useMemo, useState } from 'react';

type Color = keyof NonNullable<CalendarProps['highlightedDays']>;

const colors: Color[] = ['blue', 'green', 'purple', 'red', 'teal', 'yellow'];

export default function CalendarDemo() {
  const utils = useDateUtils();
  const [color, setColor] = useState<Color>('blue');
  const [disabled, setDisabled] = useState(false);
  const [hasFooter, setHasFooter] = useState(false);
  const [hasQuickSelection, setHasQuickSelection] = useState(false);
  const today = useMemo(() => utils.startOf(Date.now(), 'day'), [utils]);

  const highlightedDays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, idx) =>
        utils.update(today, { day: idx + 1 }),
      ),
    [today, utils],
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

        <Grid item={true} sm={true} xs={12}>
          <Grid item={true} sm={true} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Highlight Color</FormLabel>
              <RadioGroup
                row={true}
                name="color"
                value={color}
                onChange={(_, value) => setColor(value as Color)}
              >
                {colors.map(x => (
                  <FormControlLabel
                    key={x}
                    value={x}
                    control={<Radio />}
                    label={startCase(x)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Box display="flex">
        <Paper elevation={8}>
          <Calendar
            fromMonth={!disabled ? undefined : today}
            disabledDays={!disabled ? undefined : { before: today }}
            footer={
              hasFooter && (
                <Typography color="textSecondary">
                  Footer helper text
                </Typography>
              )
            }
            highlightedDays={{ [color]: highlightedDays }}
            quickSelection={
              hasQuickSelection && (
                <CalendarQuickSelection>
                  {highlightedDays.map((day, idx) => (
                    <CalendarQuickSelectionItem key={idx}>
                      {utils.formatDate(day)}
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
