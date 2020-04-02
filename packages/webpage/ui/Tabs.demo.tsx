import { Tab, Tabs, Typography } from '@material-ui/core';
import { GridStack } from '@superdispatch/ui';
import React from 'react';

export default function TabsDemo() {
  const [value, setValue] = React.useState(0);
  const options = [
    'Available (235)',
    'Requested (7)',
    'Booked (5)',
    'Suggested (375)',
    'Saved (800)',
  ];

  return (
    <GridStack spacing={2}>
      <Typography variant="h6">With Scroll Buttons</Typography>

      <Tabs
        scrollButtons="on"
        value={value}
        onChange={(_, nextValue) => setValue(nextValue)}
      >
        {options.map((x) => (
          <Tab key={x} label={x} />
        ))}
      </Tabs>

      <Typography variant="h6">Without Scroll Buttons</Typography>

      <Tabs value={value} onChange={(_, nextValue) => setValue(nextValue)}>
        {options.map((x) => (
          <Tab key={x} label={x} />
        ))}
      </Tabs>
    </GridStack>
  );
}
