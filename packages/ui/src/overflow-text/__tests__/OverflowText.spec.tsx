import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { OverflowText } from '../OverflowText';

it('checks component css', () => {
  expect(renderCSS(<OverflowText />, ['SD-OverflowText']))
    .toMatchInlineSnapshot(`
    .SD-OverflowText-root {
      transition: border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-bottom: 1px dashed transparent;
      margin-bottom: -1px;
    }

    .SD-OverflowText-root.SD-OverflowText-truncated {
      cursor: pointer;
      border-bottom-color: Color.Silver500;
    }

    .SD-OverflowText-sentinel {
      width: 1px;
      height: 100%;
      display: inline-block;
    }
  `);
});
