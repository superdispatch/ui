import { Toolbar } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/ui-testutils';
import React from 'react';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiToolbar).toMatchInlineSnapshot(`undefined`);
});

it('checks component css', () => {
  expect(renderCSS(<Toolbar />, ['MuiToolbar'])).toMatchInlineSnapshot(`
    .MuiToolbar-root {
      display: flex;
      position: relative;
      align-items: center;
    }

    .MuiToolbar-gutters {
      padding-left: 16px;
      padding-right: 16px;
    }

    @media (min-width: 600px) {
      .MuiToolbar-gutters {
        padding-left: 16px;
        padding-right: 16px;
      }
    }

    .MuiToolbar-regular {
      min-height: 64px;
    }

    @media (min-width: 0px) and (orientation: landscape) {
      .MuiToolbar-regular {
        min-height: 48px;
      }
    }

    @media (min-width: 600px) {
      .MuiToolbar-regular {
        min-height: 64px;
      }
    }

    .MuiToolbar-dense {
      min-height: 48px;
    }
  `);
});
