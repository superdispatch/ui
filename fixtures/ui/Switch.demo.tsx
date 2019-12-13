import { Box, FormControlLabel, Grid, Switch } from '@material-ui/core';
import React from 'react';

export default function SwitchDemo() {
  return (
    <Box padding={2}>
      <Grid container={true} spacing={2}>
        <Grid item={true} xs={12}>
          <Grid container={true} spacing={1}>
            <Grid item={true}>
              <FormControlLabel label="Right Label" control={<Switch />} />
            </Grid>

            <Grid item={true}>
              <FormControlLabel
                label="Left Label"
                labelPlacement="start"
                control={<Switch />}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item={true} xs={12}>
          <Grid container={true} spacing={1}>
            <Grid item={true}>
              <FormControlLabel
                label="Always On"
                control={<Switch checked={true} />}
              />
            </Grid>

            <Grid item={true}>
              <FormControlLabel
                label="Always Off"
                control={<Switch checked={false} />}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item={true} xs={12}>
          <Grid container={true} spacing={1}>
            <Grid item={true}>
              <FormControlLabel
                label="On and Disabled"
                control={<Switch checked={true} disabled={true} />}
              />
            </Grid>

            <Grid item={true}>
              <FormControlLabel
                label="Off and Disabled"
                control={<Switch checked={false} disabled={true} />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
