import { Avatar } from '@material-ui/core';
import { forwardRef, useMemo } from 'react';

export interface SidebarMenuItemAvatarProps {
  children: string;
}

export const SidebarMenuItemAvatar = forwardRef<
  HTMLDivElement,
  SidebarMenuItemAvatarProps
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
