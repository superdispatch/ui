import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { PopperPlacementType } from '@material-ui/core/Popper';
import { startCase } from 'lodash';
import React, { useCallback, useState } from 'react';

import { ThemeProvider } from '..';

const placements: PopperPlacementType[] = [
  'bottom-end',
  'bottom-start',
  'bottom',
  'left-end',
  'left-start',
  'left',
  'right-end',
  'right-start',
  'right',
  'top-end',
  'top-start',
  'top',
];

export function TooltipDemo() {
  const [placement, setPlacement] = useState<PopperPlacementType>('bottom');
  const [isOpen, setIsOpen] = useState(true);
  const [isLong, setIsLong] = useState(false);
  const [isStickedToBottom, setIsStickedToBottom] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const reset = useCallback(() => setIsClicked(false), []);
  const toggle = useCallback(() => setIsClicked(x => !x), []);
  const title = isLong
    ? 'Orders assigned to a driver and scheduled delivery date has already passed.'
    : isClicked
    ? 'Clicked'
    : 'Click';
  const key = `${isOpen}-${isLong}-${isClicked}-${isStickedToBottom}`;

  return (
    <ThemeProvider>
      <Box
        padding={2}
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent={isStickedToBottom ? 'flex-end' : 'flex-start'}
      >
        <Grid container={true} alignItems="flex-end" spacing={2}>
          <Grid item={true} xs="auto">
            <Tooltip
              key={key}
              title={title}
              onClose={reset}
              placement={placement}
              open={isOpen || undefined}
            >
              <Button onClick={toggle}>Hover</Button>
            </Tooltip>
          </Grid>

          <Grid item={true} sm={true} xs={12}>
            <TextField
              select={true}
              label="Placement"
              value={placement}
              onChange={event => setPlacement(event.target.value as PopperPlacementType)}
            >
              {placements.map(option => (
                <MenuItem key={option} value={option}>
                  {startCase(option)}
                </MenuItem>
              ))}
            </TextField>{' '}
            <FormControl component="fieldset">
              <FormLabel component="legend">Visibility</FormLabel>
              <FormGroup row={true}>
                <FormControlLabel
                  label="Open"
                  checked={isOpen}
                  control={<Switch />}
                  onChange={(_, checked) => setIsOpen(checked)}
                />

                <FormControlLabel
                  label="Long"
                  checked={isLong}
                  control={<Switch />}
                  onChange={(_, checked) => setIsLong(checked)}
                />

                <FormControlLabel
                  label="Stick to Bottom"
                  checked={isStickedToBottom}
                  control={<Switch />}
                  onChange={(_, checked) => setIsStickedToBottom(checked)}
                />
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item={true} xs="auto">
            <Tooltip
              key={key}
              title={title}
              onClose={reset}
              placement={placement}
              open={isOpen || undefined}
            >
              <Button onClick={toggle}>Hover</Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
