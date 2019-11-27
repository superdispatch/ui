import { List, ListItem, Typography } from '@material-ui/core';
import React, { forwardRef, ReactNode } from 'react';

export interface CalendarQuickSelectionProps {
  children: ReactNode;
}

export const CalendarQuickSelection = forwardRef<
  HTMLUListElement,
  CalendarQuickSelectionProps
>(({ children }, ref) => (
  <List ref={ref}>
    <ListItem>
      <Typography variant="h4">Quick Selection</Typography>
    </ListItem>

    {children}
  </List>
));

if (process.env.NODE_ENV !== 'production') {
  CalendarQuickSelection.displayName = 'CalendarQuickSelection';
}
