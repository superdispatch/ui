import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { Column, Columns } from '../Columns';

it('checks component css', () => {
  expect(
    renderCSS(
      <Columns space={1}>
        <Column />
      </Columns>,
      ['SuperDispatchColumns'],
    ),
  ).toMatchInlineSnapshot(`
    .SuperDispatchColumns-root {
      display: flex;
      flex-direction: row;
    }

    .SuperDispatchColumns-space1 {
      margin-left: -8px;
    }

    .SuperDispatchColumns-space1
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 8px;
    }

    .SuperDispatchColumns-space2 {
      margin-left: -16px;
    }

    .SuperDispatchColumns-space2
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 16px;
    }

    .SuperDispatchColumns-space3 {
      margin-left: -24px;
    }

    .SuperDispatchColumns-space3
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 24px;
    }

    .SuperDispatchColumns-space4 {
      margin-left: -32px;
    }

    .SuperDispatchColumns-space4
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 32px;
    }

    .SuperDispatchColumns-space5 {
      margin-left: -40px;
    }

    .SuperDispatchColumns-space5
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 40px;
    }

    .SuperDispatchColumns-space6 {
      margin-left: -48px;
    }

    .SuperDispatchColumns-space6
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 48px;
    }

    .SuperDispatchColumns-space7 {
      margin-left: -56px;
    }

    .SuperDispatchColumns-space7
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 56px;
    }

    .SuperDispatchColumns-space8 {
      margin-left: -64px;
    }

    .SuperDispatchColumns-space8
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 64px;
    }

    .SuperDispatchColumns-space9 {
      margin-left: -72px;
    }

    .SuperDispatchColumns-space9
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 72px;
    }

    .SuperDispatchColumns-space10 {
      margin-left: -80px;
    }

    .SuperDispatchColumns-space10
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 80px;
    }

    .SuperDispatchColumns-alignCenter {
      align-items: center;
    }

    .SuperDispatchColumns-alignBottom {
      align-items: flex-end;
    }

    .SuperDispatchColumns-column {
      min-width: 0;
    }

    .SuperDispatchColumns-widthFluid {
      width: 100%;
    }

    .SuperDispatchColumns-widthContent {
      flex-shrink: 0;
    }

    .SuperDispatchColumns-width1of2 {
      flex: 0 0 50%;
    }

    .SuperDispatchColumns-width1of3 {
      flex: 0 0 33.33333333333333%;
    }

    .SuperDispatchColumns-width2of3 {
      flex: 0 0 66.66666666666666%;
    }

    .SuperDispatchColumns-width1of4 {
      flex: 0 0 25%;
    }

    .SuperDispatchColumns-width3of4 {
      flex: 0 0 75%;
    }

    .SuperDispatchColumns-width1of5 {
      flex: 0 0 20%;
    }

    .SuperDispatchColumns-width2of5 {
      flex: 0 0 40%;
    }

    .SuperDispatchColumns-width3of5 {
      flex: 0 0 60%;
    }

    .SuperDispatchColumns-width4of5 {
      flex: 0 0 80%;
    }
  `);
});
