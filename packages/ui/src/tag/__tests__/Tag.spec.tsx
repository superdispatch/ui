import { renderCSS } from '@superdispatch/testutils';
import React from 'react';

import { Tag } from '../..';

it('checks component css', () => {
  expect(renderCSS(<Tag color="blue" variant="bold" />, ['SuperDispatchTag']))
    .toMatchInlineSnapshot(`
    .SuperDispatchTag-root {
      display: inline-flex;
      padding: 0px 4px;
      max-width: 100%;
      align-items: center;
      border-radius: 4px;
    }

    .SuperDispatchTag-variantSubtle.SuperDispatchTag-colorGrey {
      color: Color.Grey300;
      background-color: Color.Silver200;
    }

    .SuperDispatchTag-variantSubtle.SuperDispatchTag-colorBlue {
      color: Color.Blue500;
      background-color: Color.Blue50;
    }

    .SuperDispatchTag-variantSubtle.SuperDispatchTag-colorGreen {
      color: Color.Green500;
      background-color: Color.Green50;
    }

    .SuperDispatchTag-variantSubtle.SuperDispatchTag-colorPurple {
      color: Color.Purple500;
      background-color: Color.Purple50;
    }

    .SuperDispatchTag-variantSubtle.SuperDispatchTag-colorRed {
      color: Color.Red500;
      background-color: Color.Red50;
    }

    .SuperDispatchTag-variantSubtle.SuperDispatchTag-colorTeal {
      color: Color.Teal500;
      background-color: Color.Teal50;
    }

    .SuperDispatchTag-variantSubtle.SuperDispatchTag-colorYellow {
      color: Color.Yellow500;
      background-color: Color.Yellow50;
    }

    .SuperDispatchTag-variantBold {
      color: Color.White;
    }

    .SuperDispatchTag-variantBold.SuperDispatchTag-colorGrey {
      background-color: Color.Grey300;
    }

    .SuperDispatchTag-variantBold.SuperDispatchTag-colorBlue {
      background-color: Color.Blue500;
    }

    .SuperDispatchTag-variantBold.SuperDispatchTag-colorGreen {
      background-color: Color.Green500;
    }

    .SuperDispatchTag-variantBold.SuperDispatchTag-colorPurple {
      background-color: Color.Purple500;
    }

    .SuperDispatchTag-variantBold.SuperDispatchTag-colorRed {
      background-color: Color.Red500;
    }

    .SuperDispatchTag-variantBold.SuperDispatchTag-colorTeal {
      background-color: Color.Teal500;
    }

    .SuperDispatchTag-variantBold.SuperDispatchTag-colorYellow {
      background-color: Color.Yellow500;
    }
  `);
});
