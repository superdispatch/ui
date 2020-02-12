import { Drawer } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/testutils';
import React from 'react';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiDrawer).toMatchInlineSnapshot(`
    Object {
      "anchor": "right",
    }
  `);
});

it('checks component css', () => {
  expect(renderCSS(<Drawer open={true} />, ['MuiDrawer']))
    .toMatchInlineSnapshot(`
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
      min-width: 432px;
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
  `);
});
