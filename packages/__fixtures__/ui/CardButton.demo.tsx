import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
} from '@material-ui/core';
import { Add, AttachFile } from '@material-ui/icons';
import { CardButton, CardButtonProps, GridStack } from '@superdispatch/ui';
import React, { useState } from 'react';

const sizes: Array<CardButtonProps['size']> = ['small', 'medium', 'large'];

export default function CardButtonDemo() {
  const [hasStartIcon, setHasStartIcon] = useState(true);
  const [hasEndIcon, setHasEndIcon] = useState(false);
  const [hasHint, setHasHint] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <GridStack spacing={2}>
      <FormControl>
        <FormLabel>Content</FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            checked={hasStartIcon}
            label="Has Start Icon"
            control={<Switch />}
            onChange={(_, checked) => setHasStartIcon(checked)}
          />

          <FormControlLabel
            checked={hasEndIcon}
            label="Has End Icon"
            control={<Switch />}
            onChange={(_, checked) => setHasEndIcon(checked)}
          />

          <FormControlLabel
            checked={hasHint}
            label="Has Hint"
            control={<Switch />}
            onChange={(_, checked) => setHasHint(checked)}
          />

          <FormControlLabel
            checked={hasError}
            label="Has Error"
            control={<Switch />}
            onChange={(_, checked) => setHasError(checked)}
          />
        </FormGroup>
      </FormControl>

      {sizes.map(size => (
        <CardButton
          key={size}
          size={size}
          hint={hasHint && 'or Drag & Drop files here'}
          error={hasError && 'Invalid file extension'}
          startIcon={hasStartIcon && <Add />}
          endIcon={hasEndIcon && <AttachFile />}
        >
          Add Attachments
        </CardButton>
      ))}
    </GridStack>
  );
}
