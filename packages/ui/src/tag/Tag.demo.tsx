import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { startCase } from 'lodash';
import React, { useState } from 'react';

import { Tag, TagColor, TagVariant } from '..';

const colors: TagColor[] = ['grey', 'blue', 'green', 'purple', 'red', 'teal', 'yellow'];
const variants: TagVariant[] = ['subtle', 'bold'];

export default function TagDemo() {
  const [color, setColor] = useState<TagColor>('blue');

  return (
    <>
      <Box padding={2}>
        <Grid container={true} spacing={1}>
          <Grid item={true} sm={true} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Color</FormLabel>
              <RadioGroup
                row={true}
                name="color"
                value={color}
                onChange={(_, value) => setColor(value as TagColor)}
              >
                {colors.map(x => (
                  <FormControlLabel key={x} value={x} control={<Radio />} label={startCase(x)} />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box padding={2}>
        <Grid container={true} spacing={1}>
          {variants.map(variant => (
            <Grid key={variant} item={true} sm={4} xs={12}>
              <Tag color={color} variant={variant}>
                {startCase(variant)} {startCase(color)}
              </Tag>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
