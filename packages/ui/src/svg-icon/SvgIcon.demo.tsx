import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { Check } from '@material-ui/icons';
import { startCase } from 'lodash';
import React, { useState } from 'react';

const colors: Array<SvgIconProps['color']> = ['inherit', 'primary', 'action', 'disabled', 'error'];
const fontSizes: Array<SvgIconProps['fontSize']> = ['small', 'default', 'large'];

export function SvgIconDemo() {
  const [color, setColor] = useState<SvgIconProps['color']>('primary');

  return (
    <>
      <Box padding={2}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Color</FormLabel>
          <RadioGroup
            row={true}
            name="color"
            value={color}
            onChange={(_, value) => setColor(value as SvgIconProps['color'])}
          >
            {colors.map(x => (
              <FormControlLabel key={x} value={x} control={<Radio />} label={startCase(x)} />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Box padding={2}>
        <Grid container={true} spacing={1} alignItems="center">
          {fontSizes.map(fontSize => (
            <Grid item={true} key={fontSize} sm={2} xs={12}>
              <Check color={color} fontSize={fontSize} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
