import SettingsIcon from '@material-ui/icons/Settings';
import { Meta } from '@storybook/react';

import { Sidebar } from './Sidebar';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarMenuItemAction } from './SidebarMenuItemAction';
import { SidebarMenuItemAvatar } from './SidebarMenuItemAvatar';
import { SidebarMenuItemBadge } from './SidebarMenuItemBadge';
import { SidebarMenuItemDivider } from './SidebarMenuItemDivider';

export default {
  title: 'Lab/Sidebar',
  component: Sidebar,
  subcomponents: {
    SidebarMenuItem,
    SidebarMenuItemAvatar,
    SidebarMenuItemBadge,
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
    <SidebarMenuItem
      selected={true}
      action={<SidebarMenuItemBadge count={2339} />}
    >
      Available
    </SidebarMenuItem>
    <SidebarMenuItem action={<SidebarMenuItemBadge count={5} />}>
      Requested
    </SidebarMenuItem>
    <SidebarMenuItem action={<SidebarMenuItemBadge count={0} />}>
      Booked
    </SidebarMenuItem>
    <SidebarMenuItem action={<SidebarMenuItemBadge count={56} />}>
      Suggested
    </SidebarMenuItem>
  </Sidebar>
);

export const complex = () => (
  <Sidebar title="Super Loadboard">
    <SidebarMenuItem
      selected={true}
      action={<SidebarMenuItemBadge count={320} />}
    >
      Available
    </SidebarMenuItem>
    <SidebarMenuItem action={<SidebarMenuItemBadge count={5} />}>
      Requested
    </SidebarMenuItem>
    <SidebarMenuItem action={<SidebarMenuItemBadge count={12} />}>
      Booked
    </SidebarMenuItem>
    <SidebarMenuItem action={<SidebarMenuItemBadge count={56} />}>
      Suggested
    </SidebarMenuItem>

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
