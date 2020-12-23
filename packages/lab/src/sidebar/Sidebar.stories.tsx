import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import SettingsIcon from '@material-ui/icons/Settings';
import { Meta } from '@storybook/react';
import { Button } from '@superdispatch/ui';

import { Box } from '../box/Box';
import { Sidebar } from './Sidebar';
import { SidebarDivider } from './SidebarDivider';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarMenuItemAction } from './SidebarMenuItemAction';
import { SidebarMenuItemAvatar } from './SidebarMenuItemAvatar';
import { SidebarSubheader } from './SidebarSubheader';

export default {
  title: 'Lab/Sidebar',
  component: Sidebar,
  subcomponents: {
    SidebarDivider,
    SidebarMenuItem,
    SidebarMenuItemAction,
    SidebarMenuItemAvatar,
    SidebarSubheader,
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

export const avatarCheckbox = () => (
  <Sidebar title="Drivers">
    <SidebarMenuItem
      selected={true}
      avatar={
        <SidebarMenuItemAvatar value={false}>
          Eirwen Minoo
        </SidebarMenuItemAvatar>
      }
    >
      Eirwen Minoo
    </SidebarMenuItem>
    <SidebarMenuItem
      avatar={
        <SidebarMenuItemAvatar value={true}>Ole Kielo</SidebarMenuItemAvatar>
      }
    >
      Ole Kielo
    </SidebarMenuItem>
    <SidebarMenuItem
      avatar={
        <SidebarMenuItemAvatar value={false}>
          Virve Vivi Wangi
        </SidebarMenuItemAvatar>
      }
    >
      Virve Vivi Wangi
    </SidebarMenuItem>
    <SidebarMenuItem
      avatar={
        <SidebarMenuItemAvatar value={false}>
          Radulf Čedomir Niĉjo Aparna
        </SidebarMenuItemAvatar>
      }
    >
      Radulf Čedomir Niĉjo Aparna
    </SidebarMenuItem>
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

    <SidebarDivider />

    <SidebarSubheader
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
    </SidebarSubheader>

    <SidebarMenuItem
      action={
        <SidebarMenuItemAction title="Mute">
          <NotificationsIcon color="primary" />
        </SidebarMenuItemAction>
      }
      secondaryActions={
        <>
          <SidebarMenuItemAction title="Edit">
            <EditIcon />
          </SidebarMenuItemAction>

          <SidebarMenuItemAction title="Delete">
            <DeleteIcon />
          </SidebarMenuItemAction>
        </>
      }
    >
      New York, NY - Kansas City, MO
    </SidebarMenuItem>

    <SidebarMenuItem
      action={
        <SidebarMenuItemAction title="Unmute">
          <NotificationsOffIcon />
        </SidebarMenuItemAction>
      }
    >
      Kansas City, MO - New York, NY
    </SidebarMenuItem>

    <SidebarMenuItem
      action={
        <SidebarMenuItemAction title="Unmute">
          <NotificationsOffIcon />
        </SidebarMenuItemAction>
      }
    >
      New York, NY - Kansas City, KS
    </SidebarMenuItem>

    <SidebarMenuItem
      action={
        <SidebarMenuItemAction title="Unmute">
          <NotificationsOffIcon />
        </SidebarMenuItemAction>
      }
    >
      Kansas City, MO - New York, NY
    </SidebarMenuItem>

    <SidebarMenuItem
      action={
        <SidebarMenuItemAction title="Unmute">
          <NotificationsOffIcon />
        </SidebarMenuItemAction>
      }
    >
      New York, NY - Kansas City, KS
    </SidebarMenuItem>

    <SidebarMenuItem
      action={
        <SidebarMenuItemAction title="Unmute">
          <NotificationsOffIcon />
        </SidebarMenuItemAction>
      }
    >
      Kansas City, MO - New York, NY
    </SidebarMenuItem>

    <SidebarMenuItem
      action={
        <SidebarMenuItemAction title="Unmute">
          <NotificationsOffIcon />
        </SidebarMenuItemAction>
      }
    >
      New York, NY - Kansas City, KS
    </SidebarMenuItem>

    <Box
      bottom={0}
      position="sticky"
      paddingTop="small"
      paddingBottom="small"
      paddingLeft="medium"
      paddingRight="medium"
    >
      <Button fullWidth={true} startIcon={<NotificationsOffIcon />}>
        Create Load Alert
      </Button>
    </Box>
  </Sidebar>
);
