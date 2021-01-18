import { InputAdornment, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import { Meta } from '@storybook/react';
import { Button, Stack } from '@superdispatch/ui';

import { Placeholder } from '../../../__docs__';
import { Box } from '../box/Box';
import { Sidebar } from './Sidebar';
import { SidebarContainer } from './SidebarContainer';
import { SidebarDivider } from './SidebarDivider';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarMenuItemAction } from './SidebarMenuItemAction';
import { SidebarMenuItemAvatar } from './SidebarMenuItemAvatar';
import { SidebarSubheader } from './SidebarSubheader';

export default {
  title: 'Lab/Sidebar',
  component: Sidebar,
  subcomponents: {
    SidebarContainer,
    SidebarDivider,
    SidebarMenuItem,
    SidebarMenuItemAction,
    SidebarMenuItemAvatar,
    SidebarSubheader,
  },
} as Meta;

export const basic = () => (
  <SidebarContainer
    sidebar={
      <Sidebar title="Settings">
        <SidebarMenuItem selected={true}>General</SidebarMenuItem>
        <SidebarMenuItem>Terminals</SidebarMenuItem>
        <SidebarMenuItem>Driver App</SidebarMenuItem>
        <SidebarMenuItem>Billing</SidebarMenuItem>
        <SidebarMenuItem>Factoring</SidebarMenuItem>
        <SidebarMenuItem external={true}>
          Quickbooks Integration
        </SidebarMenuItem>
        <SidebarMenuItem>Subscription Details</SidebarMenuItem>
        <SidebarMenuItem external={true}>Notification Emails</SidebarMenuItem>
        <SidebarMenuItem external={true}>
          Loadboard Notifications
        </SidebarMenuItem>
      </Sidebar>
    }
  >
    <Placeholder height="100%" width="100%" text="Content" />
  </SidebarContainer>
);

export const list = () => (
  <SidebarContainer
    sidebar={
      <Sidebar
        title="Drivers"
        count={9}
        header={
          <Stack space="small">
            <Button
              fullWidth={true}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Create New
            </Button>

            <TextField
              placeholder="Search for drivers…"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        }
      >
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
          avatar={
            <SidebarMenuItemAvatar>Virve Vivi Wangi</SidebarMenuItemAvatar>
          }
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
        <SidebarMenuItem
          avatar={
            <SidebarMenuItemAvatar>Léane Audovacar</SidebarMenuItemAvatar>
          }
        >
          Léane Audovacar
        </SidebarMenuItem>
        <SidebarMenuItem
          avatar={<SidebarMenuItemAvatar>Devon Vesta</SidebarMenuItemAvatar>}
        >
          Devon Vesta
        </SidebarMenuItem>
        <SidebarMenuItem
          avatar={<SidebarMenuItemAvatar>Xenagoras Ares</SidebarMenuItemAvatar>}
        >
          Xenagoras Ares
        </SidebarMenuItem>
        <SidebarMenuItem
          avatar={<SidebarMenuItemAvatar>Nithya Phebe</SidebarMenuItemAvatar>}
        >
          Nithya Phebe
        </SidebarMenuItem>
        <SidebarMenuItem
          avatar={<SidebarMenuItemAvatar>Nitin Paulette</SidebarMenuItemAvatar>}
        >
          Nitin Paulette
        </SidebarMenuItem>
      </Sidebar>
    }
  >
    <Placeholder height="100%" width="100%" text="Content" />
  </SidebarContainer>
);

export const checkbox = () => (
  <SidebarContainer
    sidebar={
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
            <SidebarMenuItemAvatar value={true}>
              Ole Kielo
            </SidebarMenuItemAvatar>
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
    }
  >
    <Placeholder height="100%" width="100%" text="Content" />
  </SidebarContainer>
);

export const complex = () => (
  <SidebarContainer
    sidebar={
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
    }
  >
    <Placeholder height="100%" width="100%" text="Content" />
  </SidebarContainer>
);
