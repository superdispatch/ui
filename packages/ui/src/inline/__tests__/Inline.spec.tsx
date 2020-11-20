import { renderComponent, renderCSS } from '@superdispatch/ui-testutils';
import { Fragment } from 'react';

import { Inline } from '../Inline';

it('renders sentence', () => {
  const { container } = renderComponent(<Inline space={1}>Hello There</Inline>);

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="SD-Inline-root SD-Inline-space1"
      >
        <div
          class="SD-Inline-container"
        >
          <div
            class="SD-Inline-item"
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
        class="SD-Inline-root SD-Inline-space1"
      >
        <div
          class="SD-Inline-container"
        >
          <div
            class="SD-Inline-item"
          >
            A
          </div>
          <div
            class="SD-Inline-item"
          >
            B
          </div>
          <div
            class="SD-Inline-item"
          >
            C
          </div>
          <div
            class="SD-Inline-item"
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
      ['SD-Inline'],
    ),
  ).toMatchInlineSnapshot(`
    .SD-Inline-container {
      display: flex;
      flex-wrap: wrap;
    }

    .SD-Inline-space1 {
      padding-top: 1px;
    }

    .SD-Inline-space1:before {
      content: '';
      display: block;
      margin-top: -9px;
    }

    .SD-Inline-space1 > .SD-Inline-container {
      margin-left: -8px;
    }

    .SD-Inline-space1 > .SD-Inline-container > .SD-Inline-item {
      margin-top: 8px;
      margin-left: 8px;
    }

    .SD-Inline-space2 {
      padding-top: 1px;
    }

    .SD-Inline-space2:before {
      content: '';
      display: block;
      margin-top: -17px;
    }

    .SD-Inline-space2 > .SD-Inline-container {
      margin-left: -16px;
    }

    .SD-Inline-space2 > .SD-Inline-container > .SD-Inline-item {
      margin-top: 16px;
      margin-left: 16px;
    }

    .SD-Inline-space3 {
      padding-top: 1px;
    }

    .SD-Inline-space3:before {
      content: '';
      display: block;
      margin-top: -25px;
    }

    .SD-Inline-space3 > .SD-Inline-container {
      margin-left: -24px;
    }

    .SD-Inline-space3 > .SD-Inline-container > .SD-Inline-item {
      margin-top: 24px;
      margin-left: 24px;
    }

    .SD-Inline-space4 {
      padding-top: 1px;
    }

    .SD-Inline-space4:before {
      content: '';
      display: block;
      margin-top: -33px;
    }

    .SD-Inline-space4 > .SD-Inline-container {
      margin-left: -32px;
    }

    .SD-Inline-space4 > .SD-Inline-container > .SD-Inline-item {
      margin-top: 32px;
      margin-left: 32px;
    }

    .SD-Inline-space5 {
      padding-top: 1px;
    }

    .SD-Inline-space5:before {
      content: '';
      display: block;
      margin-top: -41px;
    }

    .SD-Inline-space5 > .SD-Inline-container {
      margin-left: -40px;
    }

    .SD-Inline-space5 > .SD-Inline-container > .SD-Inline-item {
      margin-top: 40px;
      margin-left: 40px;
    }

    .SD-Inline-space6 {
      padding-top: 1px;
    }

    .SD-Inline-space6:before {
      content: '';
      display: block;
      margin-top: -49px;
    }

    .SD-Inline-space6 > .SD-Inline-container {
      margin-left: -48px;
    }

    .SD-Inline-space6 > .SD-Inline-container > .SD-Inline-item {
      margin-top: 48px;
      margin-left: 48px;
    }

    .SD-Inline-space7 {
      padding-top: 1px;
    }

    .SD-Inline-space7:before {
      content: '';
      display: block;
      margin-top: -57px;
    }

    .SD-Inline-space7 > .SD-Inline-container {
      margin-left: -56px;
    }

    .SD-Inline-space7 > .SD-Inline-container > .SD-Inline-item {
      margin-top: 56px;
      margin-left: 56px;
    }

    .SD-Inline-space8 {
      padding-top: 1px;
    }

    .SD-Inline-space8:before {
      content: '';
      display: block;
      margin-top: -65px;
    }

    .SD-Inline-space8 > .SD-Inline-container {
      margin-left: -64px;
    }

    .SD-Inline-space8 > .SD-Inline-container > .SD-Inline-item {
      margin-top: 64px;
      margin-left: 64px;
    }

    .SD-Inline-space9 {
      padding-top: 1px;
    }

    .SD-Inline-space9:before {
      content: '';
      display: block;
      margin-top: -73px;
    }

    .SD-Inline-space9 > .SD-Inline-container {
      margin-left: -72px;
    }

    .SD-Inline-space9 > .SD-Inline-container > .SD-Inline-item {
      margin-top: 72px;
      margin-left: 72px;
    }

    .SD-Inline-space10 {
      padding-top: 1px;
    }

    .SD-Inline-space10:before {
      content: '';
      display: block;
      margin-top: -81px;
    }

    .SD-Inline-space10 > .SD-Inline-container {
      margin-left: -80px;
    }

    .SD-Inline-space10 > .SD-Inline-container > .SD-Inline-item {
      margin-top: 80px;
      margin-left: 80px;
    }

    .SD-Inline-verticalCenter > .SD-Inline-container {
      align-items: center;
    }

    .SD-Inline-verticalBottom > .SD-Inline-container {
      align-items: flex-end;
    }

    .SD-Inline-horizontalRight > .SD-Inline-container {
      justify-content: flex-end;
    }

    .SD-Inline-horizontalCenter > .SD-Inline-container {
      justify-content: center;
    }
  `);
});
