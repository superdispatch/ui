import { Avatar, Checkbox } from '@material-ui/core';
import { forwardRef, SyntheticEvent, useMemo } from 'react';
import styled from 'styled-components';

function stopPropagation(event: SyntheticEvent): void {
  event.stopPropagation();
}

const SidebarMenuItemAvatarCheckbox = styled.div`
  margin: -5px;
`;

export interface SidebarMenuItemAvatarProps {
  children: string;

  value?: boolean;
  onChange?: (checked: boolean) => void;
}

export const SidebarMenuItemAvatar = forwardRef<
  HTMLDivElement,
  SidebarMenuItemAvatarProps
>(({ children, value, onChange }, ref) => {
  const initials = useMemo(() => {
    const matches = children.match(/\b\w/g) || [];

    const first = matches.shift() || '';
    const last = matches.pop() || '';

    return (first + last).toUpperCase();
  }, [children]);

  if (value === true) {
    return (
      <SidebarMenuItemAvatarCheckbox>
        <Checkbox
          color="primary"
          checked={value}
          onMouseDown={stopPropagation}
          onTouchStart={stopPropagation}
          onChange={(_, checked) => {
            onChange?.(checked);
          }}
        />
      </SidebarMenuItemAvatarCheckbox>
    );
  }

  return (
    <Avatar ref={ref} aria-hidden={true}>
      {initials}
    </Avatar>
  );
});
