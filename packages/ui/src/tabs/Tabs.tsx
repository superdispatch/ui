import React from 'react';
import { Tabs, Tab, Box, Typography } from '@material-ui/core';
import { ThemeProvider } from '../index';

export function TabsDemo() {
  const [value, setValue] = React.useState(0);
  const options = [
    'Available (235)',
    'Requested (7)',
    'Booked (5)',
    'Suggested (375)',
    'Saved (800)',
  ];

  return (
    <ThemeProvider>
      <Box padding={2}>
        <Typography>With Scroll Buttons</Typography>
      </Box>

      <Tabs scrollButtons="on" value={value} onChange={(_, nextValue) => setValue(nextValue)}>
        {options.map(x => (
          <Tab key={x} label={x} />
        ))}
      </Tabs>

      <Box padding={2}>
        <Typography>Without Scroll Buttons</Typography>
      </Box>

      <Tabs value={value} onChange={(_, nextValue) => setValue(nextValue)}>
        {options.map(x => (
          <Tab key={x} label={x} />
        ))}
      </Tabs>
    </ThemeProvider>
  );
}
