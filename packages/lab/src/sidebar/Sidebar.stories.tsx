import SettingsIcon from '@material-ui/icons/Settings';
import { Meta } from '@storybook/react';

import { Sidebar } from './Sidebar';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarMenuItemAction } from './SidebarMenuItemAction';
import { SidebarMenuItemAvatar } from './SidebarMenuItemAvatar';
import { SidebarMenuItemDivider } from './SidebarMenuItemDivider';

export default {
  title: 'Lab/Sidebar',
  component: Sidebar,
  subcomponents: {
    SidebarMenuItem,
    SidebarMenuItemAvatar,
    SidebarMenuItemAction,
    SidebarMenuItemDivider,
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
    <SidebarMenuItem selected={true} badge={2339}>
      Available
    </SidebarMenuItem>
    <SidebarMenuItem badge={5}>Requested</SidebarMenuItem>
    <SidebarMenuItem badge={0}>Booked</SidebarMenuItem>
    <SidebarMenuItem badge={56}>Suggested</SidebarMenuItem>
  </Sidebar>
);

export const complex = () => (
  <Sidebar title="Super Loadboard">
    <SidebarMenuItem selected={true} badge={320}>
      Available
    </SidebarMenuItem>
    <SidebarMenuItem badge={5}>Requested</SidebarMenuItem>
    <SidebarMenuItem badge={12}>Booked</SidebarMenuItem>
    <SidebarMenuItem badge={56}>Suggested</SidebarMenuItem>

    <SidebarMenuItemDivider />

    <SidebarMenuItem
      action={
        <SidebarMenuItemAction
          placement="right"
          title="Loadboard Notifications"
        >
          <SettingsIcon />
        </SidebarMenuItemAction>
      }
    >
      Load Alerts
    </SidebarMenuItem>
  </Sidebar>
);
