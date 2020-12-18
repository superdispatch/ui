import { Avatar } from '@material-ui/core';
import { forwardRef, useMemo } from 'react';

export interface SidebarMenuButtonAvatar {
  children: string;
}

export const SidebarMenuButtonAvatar = forwardRef<
  HTMLDivElement,
  SidebarMenuButtonAvatar
>(({ children }, ref) => {
  const initials = useMemo(() => {
    const matches = children.match(/\b\w/g) || [];

    const first = matches.shift() || '';
    const last = matches.pop() || '';

    return (first + last).toUpperCase();
  }, [children]);

  return (
    <Avatar ref={ref} aria-hidden={true}>
      {initials}
    </Avatar>
  );
});
