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
} from '@material-ui/core';
import { PopperPlacementType } from '@material-ui/core/Popper';
import { startCase } from 'lodash';
import React, { useEffect, useState } from 'react';

import { Tooltip } from './Tooltip';

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

export default function TooltipDemo() {
  const [text, setText] = useState('Hint!');
  const [title, setTitle] = useState(text);
  const [placement, setPlacement] = useState<PopperPlacementType>('bottom');
  const [isOpen, setIsOpen] = useState(false);
  const [isStickedToBottom, setIsStickedToBottom] = useState(false);
  const key = `${title}-${isOpen}-${isStickedToBottom}`;

  useEffect(() => {
    const timeout = setTimeout(() => setTitle(text), 1000);

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <Box
      padding={2}
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent={isStickedToBottom ? 'flex-end' : 'flex-start'}
    >
      <Grid container={true} alignItems="flex-end" spacing={2}>
        <Grid item={true} xs="auto">
          <Tooltip key={key} title={title} placement={placement} open={isOpen || undefined}>
            <Button>Show Tooltip</Button>
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
          <TextField label="Text" value={text} onChange={event => setText(event.target.value)} />{' '}
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
                label="Stick to Bottom"
                checked={isStickedToBottom}
                control={<Switch />}
                onChange={(_, checked) => setIsStickedToBottom(checked)}
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item={true} xs="auto">
          <Tooltip key={key} title={title} placement={placement} open={isOpen || undefined}>
            <Button>Show Tooltip</Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}
