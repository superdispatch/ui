import {
  Box,
  Checkbox,
  Chip,
  ChipProps,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { startCase } from 'lodash';
import React, { useState } from 'react';

const colors: Array<ChipProps['color']> = ['default', 'primary', 'secondary'];
const sizes: Array<ChipProps['size']> = ['small', 'medium'];

export default function ChipDemo() {
  const [disabled, setDisabled] = useState(false);
  const [color, setColor] = useState<ChipProps['color']>('default');
  const [size, setSize] = useState<ChipProps['size']>('medium');
  return (
    <Box padding={2}>
      <Grid container={true} spacing={2}>
        <Grid item={true} xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">State</FormLabel>
            <FormControlLabel
              control={<Checkbox />}
              label="Disabled"
              value={disabled}
              onChange={(_, value) => setDisabled(value)}
            />
          </FormControl>
        </Grid>

        <Grid item={true} xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Color</FormLabel>
            <RadioGroup
              row={true}
              name="color"
              value={color}
              onChange={(_, value) => setColor(value as ChipProps['color'])}
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

        <Grid item={true} xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Size</FormLabel>
            <RadioGroup
              row={true}
              name="size"
              value={size}
              onChange={(_, value) => setSize(value as ChipProps['size'])}
            >
              {sizes.map(x => (
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

        <Grid item={true} xs={6}>
          <Chip label="Simple" size={size} color={color} disabled={disabled} />
        </Grid>

        <Grid item={true} xs={6}>
          <Chip
            label="Delete"
            size={size}
            color={color}
            onDelete={() => {
              // eslint-disable-next-line no-alert
              alert('Delete clicked');
            }}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
