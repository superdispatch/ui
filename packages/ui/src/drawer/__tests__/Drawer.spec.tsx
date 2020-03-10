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
        'SuperDispatchDrawerActions',
        'SuperDispatchDrawerContent',
        'SuperDispatchDrawerList',
        'SuperDispatchDrawerTitle',
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
  overflow-y: auto;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;
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

.SuperDispatchDrawerActions-appBar.SuperDispatchDrawerActions-appBar {
  top: auto;
  bottom: 0;
  transition: border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-left: none;
  border-right: none;
  border-bottom: none;
}

.SuperDispatchDrawerActions-appBar.SuperDispatchDrawerActions-appBar:not(.SuperDispatchDrawerActions-appBarSticky) {
  border-top-color: Color.Transparent;
}

.SuperDispatchDrawerActions-toolbar.SuperDispatchDrawerActions-toolbar {
  padding-left: 32px;
  padding-right: 32px;
}

.SuperDispatchDrawerContent-root {
  padding: 16px 32px;
  min-width: 432px;
}

.SuperDispatchDrawerList-root {
  min-width: 432px;
}

.SuperDispatchDrawerList-root .MuiListItem-gutters {
  padding-left: 32px;
  padding-right: 32px;
}

.SuperDispatchDrawerList-root .MuiListItemSecondaryAction-root {
  right: 32px;
}

.SuperDispatchDrawerList-root
  .MuiListItemSecondaryAction-root
  .MuiIconButton-edgeEnd {
  margin-right: -16px;
}

.SuperDispatchDrawerList-root .MuiListItem-gutters.MuiListItem-secondaryAction {
  padding-right: 64px;
}

.SuperDispatchDrawerTitle-appBar.SuperDispatchDrawerTitle-appBar {
  border-top: none;
  transition: border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-left: none;
  border-right: none;
}

.SuperDispatchDrawerTitle-appBar.SuperDispatchDrawerTitle-appBar:not(.SuperDispatchDrawerTitle-appBarSticky) {
  border-bottom-color: Color.Transparent;
}

.SuperDispatchDrawerTitle-toolbar.SuperDispatchDrawerTitle-toolbar {
  padding-left: 32px;
  padding-right: 32px;
}

.SuperDispatchDrawerTitle-startAction {
  margin-right: 4px;
}

.SuperDispatchDrawerTitle-startAction .MuiIconButton-edgeStart {
  margin-left: -16px;
}

.SuperDispatchDrawerTitle-endAction {
  margin-left: 4px;
}

.SuperDispatchDrawerTitle-endAction .MuiIconButton-edgeEnd {
  margin-right: -16px;
}
`);
});
