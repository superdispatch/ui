import { ListItem } from '@material-ui/core';
import React, { forwardRef, ReactNode } from 'react';

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
