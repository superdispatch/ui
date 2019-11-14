import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { Tag, TagProps } from '@superdispatch/ui';
import { startCase } from 'lodash';
import React, { useState } from 'react';

const colors: Array<TagProps['color']> = [
  'grey',
  'blue',
  'green',
  'purple',
  'red',
  'teal',
  'yellow',
];
const variants: Array<TagProps['variant']> = ['subtle', 'bold'];

export default function TagDemo() {
  const [color, setColor] = useState<TagProps['color']>('blue');

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
                onChange={(_, value) => setColor(value as TagProps['color'])}
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
