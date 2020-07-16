import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { Tag } from '../..';

it('checks component css', () => {
  expect(renderCSS(<Tag color="blue" variant="bold" />, ['SD-Tag']))
    .toMatchInlineSnapshot(`
    .SD-Tag-root {
      display: inline-flex;
      padding: 0px 4px;
      max-width: 100%;
      align-items: center;
      border-radius: 4px;
    }

    .SD-Tag-variantSubtle.SD-Tag-colorGrey {
      color: Color.Grey300;
      background-color: Color.Silver200;
    }

    .SD-Tag-variantSubtle.SD-Tag-colorBlue {
      color: Color.Blue500;
      background-color: Color.Blue50;
    }

    .SD-Tag-variantSubtle.SD-Tag-colorGreen {
      color: Color.Green500;
      background-color: Color.Green50;
    }

    .SD-Tag-variantSubtle.SD-Tag-colorPurple {
      color: Color.Purple500;
      background-color: Color.Purple50;
    }

    .SD-Tag-variantSubtle.SD-Tag-colorRed {
      color: Color.Red500;
      background-color: Color.Red50;
    }

    .SD-Tag-variantSubtle.SD-Tag-colorTeal {
      color: Color.Teal500;
      background-color: Color.Teal50;
    }

    .SD-Tag-variantSubtle.SD-Tag-colorYellow {
      color: Color.Yellow500;
      background-color: Color.Yellow50;
    }

    .SD-Tag-variantBold {
      color: Color.White;
    }

    .SD-Tag-variantBold.SD-Tag-colorGrey {
      background-color: Color.Grey300;
    }

    .SD-Tag-variantBold.SD-Tag-colorBlue {
      background-color: Color.Blue500;
    }

    .SD-Tag-variantBold.SD-Tag-colorGreen {
      background-color: Color.Green500;
    }

    .SD-Tag-variantBold.SD-Tag-colorPurple {
      background-color: Color.Purple500;
    }

    .SD-Tag-variantBold.SD-Tag-colorRed {
      background-color: Color.Red500;
    }

    .SD-Tag-variantBold.SD-Tag-colorTeal {
      background-color: Color.Teal500;
    }

    .SD-Tag-variantBold.SD-Tag-colorYellow {
      background-color: Color.Yellow500;
    }
  `);
});
