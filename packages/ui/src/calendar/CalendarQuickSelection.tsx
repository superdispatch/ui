import { List, ListItem, Typography } from '@material-ui/core';
import React, { forwardRef, ReactNode } from 'react';

export interface CalendarQuickSelectionProps {
  children: ReactNode;
}

export const CalendarQuickSelection = forwardRef<HTMLUListElement, CalendarQuickSelectionProps>(
  ({ children }, ref) => (
    <List ref={ref}>
      <ListItem>
        <Typography variant="h4">Quick Selection</Typography>
      </ListItem>

      {children}
    </List>
  ),
);

export interface CalendarQuickSelectionItemProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export const CalendarQuickSelectionItem = forwardRef<
  HTMLDivElement,
  CalendarQuickSelectionItemProps
>(({ onClick, selected, children }, ref) => (
  <ListItem ref={ref} button={true} selected={selected} onClick={onClick}>
    {children}
  </ListItem>
));

if (process.env.NODE_ENV === 'development') {
  CalendarQuickSelection.displayName = 'CalendarQuickSelection';
  CalendarQuickSelectionItem.displayName = 'CalendarQuickSelectionItem';
}
