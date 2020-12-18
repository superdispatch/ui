import { Meta } from '@storybook/react';

import { Sidebar } from './Sidebar';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarMenuItemAvatar } from './SidebarMenuItemAvatar';
import { SidebarMenuItemBadge } from './SidebarMenuItemBadge';

export default {
  title: 'Lab/Sidebar',
  component: Sidebar,
  subcomponents: {
    SidebarMenuItem,
    SidebarMenuItemAvatar,
    SidebarMenuItemBadge,
  },
} as Meta;

export const basic = () => (
  <Sidebar title="Settings">
    <SidebarMenuItem selected={true}>General</SidebarMenuItem>
    <SidebarMenuItem>Terminals</SidebarMenuItem>
    <SidebarMenuItem>Driver App</SidebarMenuItem>
    <SidebarMenuItem>Billing</SidebarMenuItem>
    <SidebarMenuItem>Factoring</SidebarMenuItem>
    <SidebarMenuItem external={true}>Quickbooks Integration</SidebarMenuItem>
    <SidebarMenuItem>Subscription Details</SidebarMenuItem>
    <SidebarMenuItem external={true}>Notification Emails</SidebarMenuItem>
    <SidebarMenuItem external={true}>Loadboard Notifications</SidebarMenuItem>
  </Sidebar>
);

export const avatar = () => (
  <Sidebar title="Drivers">
    <SidebarMenuItem
      selected={true}
      avatar={<SidebarMenuItemAvatar>Eirwen Minoo</SidebarMenuItemAvatar>}
    >
      Eirwen Minoo
    </SidebarMenuItem>
    <SidebarMenuItem
      avatar={<SidebarMenuItemAvatar>Ole Kielo</SidebarMenuItemAvatar>}
    >
      Ole Kielo
    </SidebarMenuItem>
    <SidebarMenuItem
      avatar={<SidebarMenuItemAvatar>Virve Vivi Wangi</SidebarMenuItemAvatar>}
    >
      Virve Vivi Wangi
    </SidebarMenuItem>
    <SidebarMenuItem
      avatar={
        <SidebarMenuItemAvatar>
          Radulf Čedomir Niĉjo Aparna
        </SidebarMenuItemAvatar>
      }
    >
      Radulf Čedomir Niĉjo Aparna
    </SidebarMenuItem>
  </Sidebar>
);

export const badge = () => (
  <Sidebar title="Super Loadboard">
    <SidebarMenuItem
      selected={true}
      endAdornment={<SidebarMenuItemBadge count={2339} />}
    >
      Available
    </SidebarMenuItem>
    <SidebarMenuItem endAdornment={<SidebarMenuItemBadge count={5} />}>
      Requested
    </SidebarMenuItem>
    <SidebarMenuItem endAdornment={<SidebarMenuItemBadge count={0} />}>
      Booked
    </SidebarMenuItem>
    <SidebarMenuItem endAdornment={<SidebarMenuItemBadge count={56} />}>
      Suggested
    </SidebarMenuItem>
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
