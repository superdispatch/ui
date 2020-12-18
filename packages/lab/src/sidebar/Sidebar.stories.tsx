import { Meta } from '@storybook/react';

import { Sidebar } from './Sidebar';
import { SidebarMenuItem } from './SidebarMenuItem';

export default {
  title: 'Lab/Sidebar',
  component: Sidebar,
  subcomponents: { SidebarMenuItem },
} as Meta;

export const basic = () => (
  <Sidebar title="Settings">
    <SidebarMenuItem selected={true}>General</SidebarMenuItem>
    <SidebarMenuItem>Terminals</SidebarMenuItem>
    <SidebarMenuItem>Driver App</SidebarMenuItem>
    <SidebarMenuItem>Billing</SidebarMenuItem>
    <SidebarMenuItem>Factoring</SidebarMenuItem>
    <SidebarMenuItem>Quickbooks Integration</SidebarMenuItem>
    <SidebarMenuItem>Subscription Details</SidebarMenuItem>
    <SidebarMenuItem>Notification Emails</SidebarMenuItem>
    <SidebarMenuItem>Loadboard Notifications</SidebarMenuItem>
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
