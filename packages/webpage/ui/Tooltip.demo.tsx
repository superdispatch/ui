import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { PopperPlacementType } from '@material-ui/core/Popper';
import { GridStack, InlineGrid } from '@superdispatch/ui';
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
    <GridStack spacing={2}>
      <InlineGrid spacing={2}>
        <FormControl>
          <FormLabel>Visibility</FormLabel>
          <FormGroup row={true}>
            <FormControlLabel
              label="Open"
              checked={isOpen}
              control={<Switch />}
              onChange={(_, checked) => setIsOpen(checked)}
            />
          </FormGroup>
        </FormControl>

        <TextField
          label="Text"
          value={text}
          onChange={event => setText(event.target.value)}
        />
      </InlineGrid>

      <InlineGrid spacing={2} justify="center">
        {placements.map(placement => (
          <Tooltip
            title={title}
            placement={placement}
            open={isOpen || undefined}
            key={`${title}-${isOpen}-${placement}`}
          >
            <Button>{startCase(placement)}</Button>
          </Tooltip>
        ))}
      </InlineGrid>
    </GridStack>
  );
}
