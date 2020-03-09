import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/ui-testutils';
import React from 'react';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiList).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiListItem).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiListItemAvatar).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiListItemIcon).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiListItemSecondaryAction).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiListItemText).toMatchInlineSnapshot(`undefined`);
});

it('checks component css', () => {
  expect(
    renderCSS(
      <List>
        <ListItem>
          <ListItemAvatar>
            <span />
          </ListItemAvatar>

          <ListItemIcon>
            <span />
          </ListItemIcon>

          <ListItemText />
          <ListItemSecondaryAction />
        </ListItem>

        <ListItem button={true} />
      </List>,
      [
        'MuiList',
        'MuiListItem',
        'MuiListItemAvatar',
        'MuiListItemIcon',
        'MuiListItemSecondaryAction',
        'MuiListItemText',
      ],
    ),
  ).toMatchInlineSnapshot(`
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

    .MuiListItemAvatar-root {
      min-width: 56px;
      flex-shrink: 0;
    }

    .MuiListItemAvatar-alignItemsFlexStart {
      margin-top: 8px;
    }

    .MuiListItemIcon-root {
      color: rgba(0, 0, 0, 0.54);
      display: inline-flex;
      min-width: 56px;
      flex-shrink: 0;
    }

    .MuiListItemIcon-alignItemsFlexStart {
      margin-top: 8px;
    }

    .MuiListItemSecondaryAction-root {
      top: 50%;
      right: 16px;
      position: absolute;
      transform: translateY(-50%);
    }

    .MuiListItemText-root {
      flex: 1 1 auto;
      min-width: 0;
      margin-top: 4px;
      margin-bottom: 4px;
    }

    .MuiListItemText-multiline {
      margin-top: 6px;
      margin-bottom: 6px;
    }

    .MuiListItemText-inset {
      padding-left: 56px;
    }
  `);
});
