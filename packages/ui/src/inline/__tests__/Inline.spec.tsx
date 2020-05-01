import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { Inline } from '../Inline';

it('checks component css', () => {
  expect(
    renderCSS(
      <Inline space={1}>
        <div />
        <div />
      </Inline>,
      ['SuperDispatchInline'],
    ),
  ).toMatchInlineSnapshot();
});
