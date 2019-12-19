import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Switch,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { PopperPlacementType } from '@material-ui/core/Popper';
import { startCase } from 'lodash';
import React, { useEffect, useState } from 'react';

const placements: PopperPlacementType[] = [
  'bottom',
  'bottom-end',
  'bottom-start',
  'left',
  'left-end',
  'left-start',
  'right',
  'right-end',
  'right-start',
  'top',
  'top-end',
  'top-start',
];

export default function TooltipDemo() {
  const [text, setText] = useState('Hint!');
  const [title, setTitle] = useState(text);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setTitle(text), 1000);

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <Box padding={2}>
      <Grid container={true} alignItems="flex-end" spacing={2}>
        <Grid item={true}>
          <TextField
            label="Text"
            value={text}
            onChange={event => setText(event.target.value)}
          />
        </Grid>

        <Grid item={true}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Visibility</FormLabel>
            <FormGroup row={true}>
              <FormControlLabel
                label="Open"
                checked={isOpen}
                control={<Switch />}
                onChange={(_, checked) => setIsOpen(checked)}
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container={true} spacing={2} justify="center">
        {placements.map(placement => (
          <Grid item={true} key={`${title}-${isOpen}-${placement}`}>
            <Tooltip
              title={title}
              placement={placement}
              open={isOpen || undefined}
            >
              <Button>{startCase(placement)}</Button>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
