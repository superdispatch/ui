import { Card } from '@material-ui/core';
import { renderCSS } from '@superdispatch/testutils';
import React from 'react';

it('checks component css', () => {
  expect(renderCSS(<Card />, ['MuiCard'])).toMatchInlineSnapshot(`
    .MuiCard-root {
      overflow: hidden;
    }
  `);
});
