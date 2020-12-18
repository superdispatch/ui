import { Meta } from '@storybook/react';

import { Sidebar } from './Sidebar';
import { SidebarMenuButton } from './SidebarMenuButton';
import { SidebarMenuButtonAvatar } from './SidebarMenuButtonAvatar';

export default {
  title: 'Lab/Sidebar',
  component: Sidebar,
  subcomponents: {
    SidebarMenuButton,
    SidebarMenuButtonAvatar,
  },
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

export const avatar = () => (
  <Sidebar title="Drivers">
    <SidebarMenuButton
      selected={true}
      avatar={<SidebarMenuButtonAvatar>Eirwen Minoo</SidebarMenuButtonAvatar>}
    >
      Eirwen Minoo
    </SidebarMenuButton>
    <SidebarMenuButton
      avatar={<SidebarMenuButtonAvatar>Ole Kielo</SidebarMenuButtonAvatar>}
    >
      Ole Kielo
    </SidebarMenuButton>
    <SidebarMenuButton
      avatar={
        <SidebarMenuButtonAvatar>Virve Vivi Wangi</SidebarMenuButtonAvatar>
      }
    >
      Virve Vivi Wangi
    </SidebarMenuButton>
    <SidebarMenuButton
      avatar={
        <SidebarMenuButtonAvatar>
          Radulf Čedomir Niĉjo Aparna
        </SidebarMenuButtonAvatar>
      }
    >
      Radulf Čedomir Niĉjo Aparna
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
