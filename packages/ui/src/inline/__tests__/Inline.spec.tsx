import { renderComponent, renderCSS } from '@superdispatch/ui-testutils';
import React, { Fragment } from 'react';

import { Inline } from '../Inline';

it('renders sentence', () => {
  const { container } = renderComponent(<Inline space={1}>Hello There</Inline>);

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="SuperDispatchInline-root SuperDispatchInline-space1"
      >
        <div
          class="SuperDispatchInline-container"
        >
          <div
            class="SuperDispatchInline-item"
          >
            Hello There
          </div>
        </div>
      </div>
    </div>
  `);
});

it('flattens children', () => {
  const { container } = renderComponent(
    <Inline space={1}>
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
    </Inline>,
  );

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="SuperDispatchInline-root SuperDispatchInline-space1"
      >
        <div
          class="SuperDispatchInline-container"
        >
          <div
            class="SuperDispatchInline-item"
          >
            A
          </div>
          <div
            class="SuperDispatchInline-item"
          >
            B
          </div>
          <div
            class="SuperDispatchInline-item"
          >
            C
          </div>
          <div
            class="SuperDispatchInline-item"
          >
            D
          </div>
        </div>
      </div>
    </div>
  `);
});

it('checks component css', () => {
  expect(
    renderCSS(
      <Inline space={1}>
        <div />
        <div />
      </Inline>,
      ['SuperDispatchInline'],
    ),
  ).toMatchInlineSnapshot(`
    .SuperDispatchInline-container {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
    }

    .SuperDispatchInline-space1 {
      padding-top: 1px;
    }

    .SuperDispatchInline-space1:before {
      content: '';
      display: block;
      margin-top: -9px;
    }

    .SuperDispatchInline-space1 > .SuperDispatchInline-container {
      margin-left: -8px;
    }

    .SuperDispatchInline-space1
      > .SuperDispatchInline-container
      > .SuperDispatchInline-item {
      padding-top: 8px;
      padding-left: 8px;
    }

    .SuperDispatchInline-space2 {
      padding-top: 1px;
    }

    .SuperDispatchInline-space2:before {
      content: '';
      display: block;
      margin-top: -17px;
    }

    .SuperDispatchInline-space2 > .SuperDispatchInline-container {
      margin-left: -16px;
    }

    .SuperDispatchInline-space2
      > .SuperDispatchInline-container
      > .SuperDispatchInline-item {
      padding-top: 16px;
      padding-left: 16px;
    }

    .SuperDispatchInline-space3 {
      padding-top: 1px;
    }

    .SuperDispatchInline-space3:before {
      content: '';
      display: block;
      margin-top: -25px;
    }

    .SuperDispatchInline-space3 > .SuperDispatchInline-container {
      margin-left: -24px;
    }

    .SuperDispatchInline-space3
      > .SuperDispatchInline-container
      > .SuperDispatchInline-item {
      padding-top: 24px;
      padding-left: 24px;
    }

    .SuperDispatchInline-space4 {
      padding-top: 1px;
    }

    .SuperDispatchInline-space4:before {
      content: '';
      display: block;
      margin-top: -33px;
    }

    .SuperDispatchInline-space4 > .SuperDispatchInline-container {
      margin-left: -32px;
    }

    .SuperDispatchInline-space4
      > .SuperDispatchInline-container
      > .SuperDispatchInline-item {
      padding-top: 32px;
      padding-left: 32px;
    }

    .SuperDispatchInline-space5 {
      padding-top: 1px;
    }

    .SuperDispatchInline-space5:before {
      content: '';
      display: block;
      margin-top: -41px;
    }

    .SuperDispatchInline-space5 > .SuperDispatchInline-container {
      margin-left: -40px;
    }

    .SuperDispatchInline-space5
      > .SuperDispatchInline-container
      > .SuperDispatchInline-item {
      padding-top: 40px;
      padding-left: 40px;
    }

    .SuperDispatchInline-space6 {
      padding-top: 1px;
    }

    .SuperDispatchInline-space6:before {
      content: '';
      display: block;
      margin-top: -49px;
    }

    .SuperDispatchInline-space6 > .SuperDispatchInline-container {
      margin-left: -48px;
    }

    .SuperDispatchInline-space6
      > .SuperDispatchInline-container
      > .SuperDispatchInline-item {
      padding-top: 48px;
      padding-left: 48px;
    }

    .SuperDispatchInline-space7 {
      padding-top: 1px;
    }

    .SuperDispatchInline-space7:before {
      content: '';
      display: block;
      margin-top: -57px;
    }

    .SuperDispatchInline-space7 > .SuperDispatchInline-container {
      margin-left: -56px;
    }

    .SuperDispatchInline-space7
      > .SuperDispatchInline-container
      > .SuperDispatchInline-item {
      padding-top: 56px;
      padding-left: 56px;
    }

    .SuperDispatchInline-space8 {
      padding-top: 1px;
    }

    .SuperDispatchInline-space8:before {
      content: '';
      display: block;
      margin-top: -65px;
    }

    .SuperDispatchInline-space8 > .SuperDispatchInline-container {
      margin-left: -64px;
    }

    .SuperDispatchInline-space8
      > .SuperDispatchInline-container
      > .SuperDispatchInline-item {
      padding-top: 64px;
      padding-left: 64px;
    }

    .SuperDispatchInline-space9 {
      padding-top: 1px;
    }

    .SuperDispatchInline-space9:before {
      content: '';
      display: block;
      margin-top: -73px;
    }

    .SuperDispatchInline-space9 > .SuperDispatchInline-container {
      margin-left: -72px;
    }

    .SuperDispatchInline-space9
      > .SuperDispatchInline-container
      > .SuperDispatchInline-item {
      padding-top: 72px;
      padding-left: 72px;
    }

    .SuperDispatchInline-space10 {
      padding-top: 1px;
    }

    .SuperDispatchInline-space10:before {
      content: '';
      display: block;
      margin-top: -81px;
    }

    .SuperDispatchInline-space10 > .SuperDispatchInline-container {
      margin-left: -80px;
    }

    .SuperDispatchInline-space10
      > .SuperDispatchInline-container
      > .SuperDispatchInline-item {
      padding-top: 80px;
      padding-left: 80px;
    }

    .SuperDispatchInline-verticalCenter > .SuperDispatchInline-container {
      align-items: center;
    }

    .SuperDispatchInline-verticalBottom > .SuperDispatchInline-container {
      align-items: flex-end;
    }

    .SuperDispatchInline-horizontalRight > .SuperDispatchInline-container {
      justify-content: flex-end;
    }

    .SuperDispatchInline-horizontalCenter > .SuperDispatchInline-container {
      justify-content: center;
    }
  `);
});
