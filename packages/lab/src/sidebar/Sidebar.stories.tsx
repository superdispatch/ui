import { Meta } from '@storybook/react';

import { Sidebar } from './Sidebar';
import { SidebarMenuButton } from './SidebarMenuButton';

export default {
  title: 'Lab/Sidebar',
  component: Sidebar,
  subcomponents: { SidebarMenuItem: SidebarMenuButton },
} as Meta;

export const basic = () => (
  <Sidebar title="Settings">
    <SidebarMenuButton selected={true}>General</SidebarMenuButton>
    <SidebarMenuButton>Terminals</SidebarMenuButton>
    <SidebarMenuButton>Driver App</SidebarMenuButton>
    <SidebarMenuButton>Billing</SidebarMenuButton>
    <SidebarMenuButton>Factoring</SidebarMenuButton>
    <SidebarMenuButton external={true}>
      Quickbooks Integration
    </SidebarMenuButton>
    <SidebarMenuButton>Subscription Details</SidebarMenuButton>
    <SidebarMenuButton external={true}>Notification Emails</SidebarMenuButton>
    <SidebarMenuButton external={true}>
      Loadboard Notifications
    </SidebarMenuButton>
  </Sidebar>
);

// <SidebarMenuItem
//   endAdornment={<SidebarMenuItemBadge>4</SidebarMenuItemBadge>}
// >
//   Item Label
// </SidebarMenuItem>
//
// <SidebarMenuItem
//   selected={true}
//   endAdornment={<SidebarMenuItemBadge>4</SidebarMenuItemBadge>}
// >
//   Item Label
// </SidebarMenuItem>
//
// <SidebarMenuItem
//   selected={true}
//   endAdornment={<SidebarMenuItemAction icon={<NotificationOffIcon />} />}
//   endActions={
//     <>
//       <EditIcon />
//       <DeleteIcon />
//     </>
//   }
// >
//   New York, NY - Kansas...
// </SidebarMenuItem>
//
// <SidebarMenuItem
//   startAdornment={
//     <SidebarMenuItemAvatar value="Darrell Steward" checked={false} />
//   }
// >
//   Darrell Steward
// </SidebarMenuItem>
