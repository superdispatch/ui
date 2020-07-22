import {
  Avatar as MuiAvatar,
  AvatarProps,
  CardActionArea as MuiCardActionArea,
  CardActionAreaProps,
  CardContent as MuiCardContent,
  CardContentProps,
  CardHeader as MuiCardHeader,
  CardHeaderProps,
  CardMedia as MuiCardMedia,
  CardMediaProps,
  Chip as MuiChip,
  ChipProps,
  DialogContentText as MuiDialogContentText,
  DialogContentTextProps,
  Grid as MuiGrid,
  GridProps,
  IconButton as MuiIconButton,
  IconButtonProps,
  Link as MuiLink,
  LinkProps,
  List as MuiList,
  ListItem as MuiListItem,
  ListItemProps,
  ListProps,
  ListSubheader as MuiListSubheader,
  ListSubheaderProps,
  MenuItem as MuiMenuItem,
  MenuItemProps,
  SvgIcon as MuiSvgIcon,
  SvgIconProps,
  Tab as MuiTab,
  TabProps,
  Tabs as MuiTabs,
  TabsProps,
  Toolbar as MuiToolbar,
  ToolbarProps,
  Typography as MuiTypography,
  TypographyProps,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import { Skeleton as MuiSkeleton, SkeletonProps } from '@material-ui/lab';
import { FunctionComponent } from 'react';

export const Skeleton = MuiSkeleton as FunctionComponent<SkeletonProps>;
export { Autocomplete, Alert, AlertTitle } from '@material-ui/lab';

export const Avatar = MuiAvatar as FunctionComponent<AvatarProps>;
export const CardActionArea = MuiCardActionArea as FunctionComponent<
  CardActionAreaProps
>;
export const CardContent = MuiCardContent as FunctionComponent<
  CardContentProps
>;
export const CardHeader = MuiCardHeader as FunctionComponent<CardHeaderProps>;
export const CardMedia = MuiCardMedia as FunctionComponent<CardMediaProps>;
export const Chip = MuiChip as FunctionComponent<ChipProps>;
export const DialogContentText = MuiDialogContentText as FunctionComponent<
  DialogContentTextProps
>;
export const Grid = MuiGrid as FunctionComponent<GridProps>;
export const IconButton = MuiIconButton as FunctionComponent<IconButtonProps>;
export const Link = MuiLink as FunctionComponent<LinkProps>;
export const List = MuiList as FunctionComponent<ListProps>;
export const ListItem = MuiListItem as FunctionComponent<ListItemProps>;
export const ListSubheader = MuiListSubheader as FunctionComponent<
  ListSubheaderProps
>;
export const MenuItem = MuiMenuItem as FunctionComponent<MenuItemProps>;
export const SvgIcon = MuiSvgIcon as FunctionComponent<SvgIconProps>;
export const Tab = MuiTab as FunctionComponent<TabProps>;
export const Tabs = MuiTabs as FunctionComponent<TabsProps>;
export const Toolbar = MuiToolbar as FunctionComponent<ToolbarProps>;
export const Typography = MuiTypography as FunctionComponent<TypographyProps>;

export {
  AppBar,
  Box,
  Card,
  CardActions,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuList,
  Paper,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Tooltip,
} from '@material-ui/core';

export { Icons };

export * from '@superdispatch/ui';
export * from '@superdispatch/dates';
export * from '@superdispatch/phones';
export * from '@superdispatch/forms';

export { Placeholder } from './Placeholder';
