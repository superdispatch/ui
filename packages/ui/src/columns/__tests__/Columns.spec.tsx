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

    .SuperDispatchColumns-column {
      min-width: 0;
    }

    .SuperDispatchColumns-collapsed {
      flex-direction: column;
    }

    .SuperDispatchColumns-space1:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-columnContent {
      padding-right: 8px;
    }

    .SuperDispatchColumns-space1:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-right: 0;
    }

    .SuperDispatchColumns-space1.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-columnContent {
      padding-bottom: 8px;
    }

    .SuperDispatchColumns-space1.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-bottom: 0;
    }

    .SuperDispatchColumns-space2:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-columnContent {
      padding-right: 16px;
    }

    .SuperDispatchColumns-space2:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-right: 0;
    }

    .SuperDispatchColumns-space2.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-columnContent {
      padding-bottom: 16px;
    }

    .SuperDispatchColumns-space2.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-bottom: 0;
    }

    .SuperDispatchColumns-space3:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-columnContent {
      padding-right: 24px;
    }

    .SuperDispatchColumns-space3:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-right: 0;
    }

    .SuperDispatchColumns-space3.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-columnContent {
      padding-bottom: 24px;
    }

    .SuperDispatchColumns-space3.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-bottom: 0;
    }

    .SuperDispatchColumns-space4:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-columnContent {
      padding-right: 32px;
    }

    .SuperDispatchColumns-space4:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-right: 0;
    }

    .SuperDispatchColumns-space4.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-columnContent {
      padding-bottom: 32px;
    }

    .SuperDispatchColumns-space4.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-bottom: 0;
    }

    .SuperDispatchColumns-space5:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-columnContent {
      padding-right: 40px;
    }

    .SuperDispatchColumns-space5:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-right: 0;
    }

    .SuperDispatchColumns-space5.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-columnContent {
      padding-bottom: 40px;
    }

    .SuperDispatchColumns-space5.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-bottom: 0;
    }

    .SuperDispatchColumns-space6:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-columnContent {
      padding-right: 48px;
    }

    .SuperDispatchColumns-space6:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-right: 0;
    }

    .SuperDispatchColumns-space6.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-columnContent {
      padding-bottom: 48px;
    }

    .SuperDispatchColumns-space6.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-bottom: 0;
    }

    .SuperDispatchColumns-space7:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-columnContent {
      padding-right: 56px;
    }

    .SuperDispatchColumns-space7:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-right: 0;
    }

    .SuperDispatchColumns-space7.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-columnContent {
      padding-bottom: 56px;
    }

    .SuperDispatchColumns-space7.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-bottom: 0;
    }

    .SuperDispatchColumns-space8:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-columnContent {
      padding-right: 64px;
    }

    .SuperDispatchColumns-space8:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-right: 0;
    }

    .SuperDispatchColumns-space8.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-columnContent {
      padding-bottom: 64px;
    }

    .SuperDispatchColumns-space8.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-bottom: 0;
    }

    .SuperDispatchColumns-space9:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-columnContent {
      padding-right: 72px;
    }

    .SuperDispatchColumns-space9:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-right: 0;
    }

    .SuperDispatchColumns-space9.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-columnContent {
      padding-bottom: 72px;
    }

    .SuperDispatchColumns-space9.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-bottom: 0;
    }

    .SuperDispatchColumns-space10:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-columnContent {
      padding-right: 80px;
    }

    .SuperDispatchColumns-space10:not(.SuperDispatchColumns-collapsed)
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-right: 0;
    }

    .SuperDispatchColumns-space10.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-columnContent {
      padding-bottom: 80px;
    }

    .SuperDispatchColumns-space10.SuperDispatchColumns-collapsed
      .SuperDispatchColumns-column:last-child
      .SuperDispatchColumns-columnContent {
      padding-bottom: 0;
    }

    .SuperDispatchColumns-alignCenter {
      align-items: center;
    }

    .SuperDispatchColumns-alignBottom {
      align-items: flex-end;
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
