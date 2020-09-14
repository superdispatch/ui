import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { Tiles } from '../Tiles';

it('checks component css', () => {
  expect(
    renderCSS(
      <Tiles space={1}>
        <div />
        <div />
      </Tiles>,
      ['SD-Tiles'],
    ),
  ).toMatchInlineSnapshot(`
    .SD-Tiles-root {
      padding-top: 1px;
    }

    .SD-Tiles-root:before {
      content: '';
      display: block;
      margin-top: -1px;
    }

    .SD-Tiles-container {
      display: flex;
      flex-wrap: wrap;
    }

    .SD-Tiles-child {
      min-width: 0;
    }

    .SD-Tiles-childContainer {
      height: 100%;
    }

    .SD-Tiles-space1:before {
      margin-top: -9px;
    }

    .SD-Tiles-space1 > .SD-Tiles-container {
      margin-left: -8px;
    }

    .SD-Tiles-space1
      > .SD-Tiles-container
      > .SD-Tiles-child
      > .SD-Tiles-childContainer {
      margin-top: 8px;
      margin-left: 8px;
    }

    .SD-Tiles-space2:before {
      margin-top: -17px;
    }

    .SD-Tiles-space2 > .SD-Tiles-container {
      margin-left: -16px;
    }

    .SD-Tiles-space2
      > .SD-Tiles-container
      > .SD-Tiles-child
      > .SD-Tiles-childContainer {
      margin-top: 16px;
      margin-left: 16px;
    }

    .SD-Tiles-space3:before {
      margin-top: -25px;
    }

    .SD-Tiles-space3 > .SD-Tiles-container {
      margin-left: -24px;
    }

    .SD-Tiles-space3
      > .SD-Tiles-container
      > .SD-Tiles-child
      > .SD-Tiles-childContainer {
      margin-top: 24px;
      margin-left: 24px;
    }

    .SD-Tiles-space4:before {
      margin-top: -33px;
    }

    .SD-Tiles-space4 > .SD-Tiles-container {
      margin-left: -32px;
    }

    .SD-Tiles-space4
      > .SD-Tiles-container
      > .SD-Tiles-child
      > .SD-Tiles-childContainer {
      margin-top: 32px;
      margin-left: 32px;
    }

    .SD-Tiles-space5:before {
      margin-top: -41px;
    }

    .SD-Tiles-space5 > .SD-Tiles-container {
      margin-left: -40px;
    }

    .SD-Tiles-space5
      > .SD-Tiles-container
      > .SD-Tiles-child
      > .SD-Tiles-childContainer {
      margin-top: 40px;
      margin-left: 40px;
    }

    .SD-Tiles-space6:before {
      margin-top: -49px;
    }

    .SD-Tiles-space6 > .SD-Tiles-container {
      margin-left: -48px;
    }

    .SD-Tiles-space6
      > .SD-Tiles-container
      > .SD-Tiles-child
      > .SD-Tiles-childContainer {
      margin-top: 48px;
      margin-left: 48px;
    }

    .SD-Tiles-space7:before {
      margin-top: -57px;
    }

    .SD-Tiles-space7 > .SD-Tiles-container {
      margin-left: -56px;
    }

    .SD-Tiles-space7
      > .SD-Tiles-container
      > .SD-Tiles-child
      > .SD-Tiles-childContainer {
      margin-top: 56px;
      margin-left: 56px;
    }

    .SD-Tiles-space8:before {
      margin-top: -65px;
    }

    .SD-Tiles-space8 > .SD-Tiles-container {
      margin-left: -64px;
    }

    .SD-Tiles-space8
      > .SD-Tiles-container
      > .SD-Tiles-child
      > .SD-Tiles-childContainer {
      margin-top: 64px;
      margin-left: 64px;
    }

    .SD-Tiles-space9:before {
      margin-top: -73px;
    }

    .SD-Tiles-space9 > .SD-Tiles-container {
      margin-left: -72px;
    }

    .SD-Tiles-space9
      > .SD-Tiles-container
      > .SD-Tiles-child
      > .SD-Tiles-childContainer {
      margin-top: 72px;
      margin-left: 72px;
    }

    .SD-Tiles-space10:before {
      margin-top: -81px;
    }

    .SD-Tiles-space10 > .SD-Tiles-container {
      margin-left: -80px;
    }

    .SD-Tiles-space10
      > .SD-Tiles-container
      > .SD-Tiles-child
      > .SD-Tiles-childContainer {
      margin-top: 80px;
      margin-left: 80px;
    }

    .SD-Tiles-columns1 {
      flex: 0 0 100%;
    }

    .SD-Tiles-columns2 {
      flex: 0 0 50%;
    }

    .SD-Tiles-columns3 {
      flex: 0 0 33.333333333333336%;
    }

    .SD-Tiles-columns4 {
      flex: 0 0 25%;
    }

    .SD-Tiles-columns5 {
      flex: 0 0 20%;
    }

    .SD-Tiles-columns6 {
      flex: 0 0 16.666666666666668%;
    }
  `);
});
