import { renderComponent, renderCSS } from '@superdispatch/ui-testutils';
import React, { Fragment } from 'react';

import { Stack } from '../Stack';

it('flattens children', () => {
  const { container } = renderComponent(
    <Stack space={1}>
      A{null}
      {false}
      {undefined}
      <>
        B{null}
        {false}
        {undefined}
        {[
          null,
          false,
          undefined,
          'C',
          <Fragment key="d">
            D{null}
            {false}
            {undefined}
          </Fragment>,
        ]}
      </>
    </Stack>,
  );

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="SD-Stack-root SD-Stack-space1"
      >
        <div
          class="SD-Stack-item"
        >
          A
        </div>
        <div
          class="SD-Stack-item"
        >
          B
        </div>
        <div
          class="SD-Stack-item"
        >
          C
        </div>
        <div
          class="SD-Stack-item"
        >
          D
        </div>
      </div>
    </div>
  `);
});

it('checks component css', () => {
  expect(
    renderCSS(
      <Stack space={1}>
        <div />
        <div />
      </Stack>,
      ['SD-Stack'],
    ),
  ).toMatchInlineSnapshot(`
    .SD-Stack-root.SD-Stack-space1 > .SD-Stack-item {
      padding-bottom: 8px;
    }

    .SD-Stack-root.SD-Stack-space2 > .SD-Stack-item {
      padding-bottom: 16px;
    }

    .SD-Stack-root.SD-Stack-space3 > .SD-Stack-item {
      padding-bottom: 24px;
    }

    .SD-Stack-root.SD-Stack-space4 > .SD-Stack-item {
      padding-bottom: 32px;
    }

    .SD-Stack-root.SD-Stack-space5 > .SD-Stack-item {
      padding-bottom: 40px;
    }

    .SD-Stack-root.SD-Stack-space6 > .SD-Stack-item {
      padding-bottom: 48px;
    }

    .SD-Stack-root.SD-Stack-space7 > .SD-Stack-item {
      padding-bottom: 56px;
    }

    .SD-Stack-root.SD-Stack-space8 > .SD-Stack-item {
      padding-bottom: 64px;
    }

    .SD-Stack-root.SD-Stack-space9 > .SD-Stack-item {
      padding-bottom: 72px;
    }

    .SD-Stack-root.SD-Stack-space10 > .SD-Stack-item {
      padding-bottom: 80px;
    }

    .SD-Stack-root.SD-Stack-alignRight > .SD-Stack-item {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
    }

    .SD-Stack-root.SD-Stack-alignCenter > .SD-Stack-item {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .SD-Stack-root > .SD-Stack-item:last-child {
      padding-bottom: 0;
    }
  `);
});
