import { Menu, MenuItem } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/testutils';
import React from 'react';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiMenu).toMatchInlineSnapshot(`
    Object {
      anchorOrigin: Object {
        horizontal: left,
        vertical: bottom,
      },
      getContentAnchorEl: null,
      keepMounted: true,
      transformOrigin: Object {
        horizontal: left,
        vertical: top,
      },
    }
  `);
  expect(props.MuiMenuItem).toMatchInlineSnapshot(`undefined`);
});

it('checks component css', () => {
  expect(
    renderCSS(
      <Menu open={true} anchorEl={document.body}>
        <MenuItem />
      </Menu>,
      [
        'MuiMenu',
        'MuiMenuItem',
        // TODO: check these components separately
        'MuiList',
        'MuiListItem',
        'MuiPopover',
      ],
    ),
  ).toMatchInlineSnapshot(`
.MuiMenu-paper {
  max-height: calc(100% - 96px);
  -webkit-overflow-scrolling: touch;
}

.MuiMenu-list {
  outline: 0;
}

.MuiMenuItem-root {
  width: auto;
  overflow: hidden;
  font-size: 14px;
  box-sizing: border-box;
  min-height: 48px;
  font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
    'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 20px;
  padding-top: 8px;
  white-space: nowrap;
  padding-bottom: 8px;
}

@media (min-width: 0px) and (max-width: 599.95px) {
  .MuiMenuItem-root {
    font-size: 16px;
    line-height: 24px;
  }
}

@media (min-width: 600px) {
  .MuiMenuItem-root {
    min-height: auto;
  }
}

.MuiMenuItem-dense {
  font-size: 14px;
  min-height: auto;
  font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
    'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 20px;
}

@media (min-width: 0px) and (max-width: 599.95px) {
  .MuiMenuItem-dense {
    font-size: 16px;
    line-height: 24px;
  }
}

.MuiList-root {
  margin: 0;
  padding: 0;
  position: relative;
  list-style: none;
}

.MuiList-padding {
  padding-top: 8px;
  padding-bottom: 8px;
}

.MuiList-subheader {
  padding-top: 0;
}

.MuiListItem-root {
  width: 100%;
  display: flex;
  position: relative;
  box-sizing: border-box;
  text-align: left;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  justify-content: flex-start;
  text-decoration: none;
}

.MuiListItem-root.Mui-focusVisible {
  background-color: Color.Silver300;
}

.MuiListItem-root.Mui-selected,
.MuiListItem-root.Mui-selected:hover {
  background-color: Color.Blue50;
}

.MuiListItem-root.Mui-disabled {
  opacity: 0.5;
}

.MuiListItem-root .MuiTouchRipple-root {
  color: Color.Blue100;
}

.MuiListItem-container {
  position: relative;
}

.MuiListItem-dense {
  padding-top: 4px;
  padding-bottom: 4px;
}

.MuiListItem-alignItemsFlexStart {
  align-items: flex-start;
}

.MuiListItem-divider {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background-clip: padding-box;
}

.MuiListItem-gutters {
  padding-left: 16px;
  padding-right: 16px;
}

.MuiListItem-button {
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.MuiListItem-button:hover {
  text-decoration: none;
  background-color: Color.Silver100;
}

@media (hover: none) {
  .MuiListItem-button:hover {
    background-color: transparent;
  }
}

.MuiListItem-secondaryAction {
  padding-right: 48px;
}

.MuiPopover-paper {
  outline: 0;
  position: absolute;
  max-width: calc(100% - 32px);
  min-width: 16px;
  max-height: calc(100% - 32px);
  min-height: 16px;
  overflow-x: hidden;
  overflow-y: auto;
}
`);
});
