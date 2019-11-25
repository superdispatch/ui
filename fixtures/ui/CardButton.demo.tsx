import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Switch,
} from '@material-ui/core';
import { Add, AttachFile } from '@material-ui/icons';
import { CardButton, CardButtonProps } from '@superdispatch/ui';
import React, { useState } from 'react';

const sizes: Array<CardButtonProps['size']> = ['small', 'medium', 'large'];

export default function CardButtonDemo() {
  const [hasStartIcon, setHasStartIcon] = useState(true);
  const [hasEndIcon, setHasEndIcon] = useState(false);
  const [hasHint, setHasHint] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <>
      <Box padding={2}>
        <Grid container={true} spacing={1}>
          <Grid item={true} sm={true} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Content</FormLabel>
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
          </Grid>
        </Grid>
      </Box>

      <Box padding={2}>
        <Grid container={true} spacing={1}>
          {sizes.map(size => (
            <Grid key={size} item={true} sm={4} xs={12}>
              <CardButton
                size={size}
                hint={hasHint && 'or Drag & Drop files here'}
                error={hasError && 'Invalid file extension'}
                startIcon={hasStartIcon && <Add />}
                endIcon={hasEndIcon && <AttachFile />}
              >
                Add Attachments
              </CardButton>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
