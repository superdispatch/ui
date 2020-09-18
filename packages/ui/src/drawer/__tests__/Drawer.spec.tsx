import { Drawer } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/ui-testutils';
import React from 'react';

import { DrawerActions } from '../DrawerActions';
import { DrawerContent } from '../DrawerContent';
import { DrawerList } from '../DrawerList';
import { DrawerTitle } from '../DrawerTitle';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiDrawer).toMatchInlineSnapshot(`
    Object {
      "anchor": "right",
    }
  `);
});

it('checks component css', () => {
  expect(
    renderCSS(
      <Drawer open={true}>
        <DrawerTitle title="Title" />
        <DrawerContent />
        <DrawerList />
        <DrawerActions />
      </Drawer>,
      [
        'MuiDrawer',
        'SD-DrawerActions',
        'SD-DrawerContent',
        'SD-DrawerList',
        'SD-DrawerTitle',
      ],
    ),
  ).toMatchInlineSnapshot(`
    .MuiDrawer-docked {
      flex: 0 0 auto;
    }

    .MuiDrawer-paper {
      top: 0;
      flex: 1 0 auto;
      height: 100%;
      display: flex;
      outline: 0;
      z-index: 1200;
      position: fixed;
      max-width: 100%;
      min-width: 100%;
      overflow-y: auto;
      flex-direction: column;
      -webkit-overflow-scrolling: touch;
    }

    @media (min-width: 600px) {
      .MuiDrawer-paper {
        max-width: 600px;
        min-width: 432px;
      }
    }

    .MuiDrawer-paperAnchorLeft {
      left: 0;
      right: auto;
    }

    .MuiDrawer-paperAnchorRight {
      left: auto;
      right: 0;
    }

    .MuiDrawer-paperAnchorTop {
      top: 0;
      left: 0;
      right: 0;
      bottom: auto;
      height: auto;
      max-height: 100%;
    }

    .MuiDrawer-paperAnchorBottom {
      top: auto;
      left: 0;
      right: 0;
      bottom: 0;
      height: auto;
      max-height: 100%;
    }

    .MuiDrawer-paperAnchorDockedLeft {
      border-right: 1px solid rgba(0, 0, 0, 0.12);
    }

    .MuiDrawer-paperAnchorDockedTop {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    .MuiDrawer-paperAnchorDockedRight {
      border-left: 1px solid rgba(0, 0, 0, 0.12);
    }

    .MuiDrawer-paperAnchorDockedBottom {
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }

    .SD-DrawerActions-appBar.SD-DrawerActions-appBar {
      top: auto;
      bottom: 0;
      transition: border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-left: none;
      border-right: none;
      border-bottom: none;
    }

    .SD-DrawerActions-appBar.SD-DrawerActions-appBar:not(.SD-DrawerActions-appBarSticky) {
      border-top-color: Color.Transparent;
    }

    .SD-DrawerActions-toolbar.MuiToolbar-gutters {
      padding-left: 24px;
      padding-right: 24px;
    }

    @media (min-width: 960px) {
      .SD-DrawerActions-toolbar.MuiToolbar-gutters {
        padding-left: 32px;
        padding-right: 32px;
      }
    }

    .SD-DrawerContent-root {
      padding: 16px 24px;
      max-width: 100%;
    }

    @media (min-width: 960px) {
      .SD-DrawerContent-root {
        padding: 16px 32px;
      }
    }

    .SD-DrawerList-root {
      max-width: 100%;
    }

    .SD-DrawerList-root .MuiListItem-gutters {
      padding-left: 24px;
      padding-right: 24px;
    }

    @media (min-width: 960px) {
      .SD-DrawerList-root .MuiListItem-gutters {
        padding-left: 32px;
        padding-right: 32px;
      }

      .SD-DrawerList-root .MuiListItem-gutters.MuiListItem-secondaryAction {
        padding-right: 64px;
      }

      .SD-DrawerList-root .MuiListItem-gutters .MuiListItemSecondaryAction-root {
        right: 32px;
      }

      .SD-DrawerList-root
        .MuiListItem-gutters
        .MuiListItemSecondaryAction-root
        .MuiIconButton-edgeEnd {
        margin-right: -16px;
      }
    }

    .SD-DrawerList-root .MuiListItem-gutters.MuiListItem-secondaryAction {
      padding-right: 48px;
    }

    .SD-DrawerList-root .MuiListItem-gutters .MuiListItemSecondaryAction-root {
      right: 24px;
    }

    .SD-DrawerList-root
      .MuiListItem-gutters
      .MuiListItemSecondaryAction-root
      .MuiIconButton-edgeEnd {
      margin-right: -12px;
    }

    .SD-DrawerTitle-appBar.SD-DrawerTitle-appBar {
      border-top: none;
      transition: border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-left: none;
      border-right: none;
    }

    .SD-DrawerTitle-appBar.SD-DrawerTitle-appBar:not(.SD-DrawerTitle-appBarSticky) {
      border-bottom-color: Color.Transparent;
    }

    .SD-DrawerTitle-toolbar.MuiToolbar-gutters {
      padding-left: 24px;
      padding-right: 24px;
    }

    @media (min-width: 960px) {
      .SD-DrawerTitle-toolbar.MuiToolbar-gutters {
        padding-left: 32px;
        padding-right: 32px;
      }
    }

    .SD-DrawerTitle-startAction {
      margin-right: 4px;
    }

    .SD-DrawerTitle-startAction .MuiIconButton-edgeStart {
      margin-left: -16px;
    }

    .SD-DrawerTitle-endAction {
      margin-left: 4px;
    }

    .SD-DrawerTitle-endAction .MuiIconButton-edgeEnd {
      margin-right: -16px;
    }
  `);
});
