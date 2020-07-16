import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { Column, Columns } from '../Columns';

it('checks component css', () => {
  expect(
    renderCSS(
      <Columns space={1}>
        <Column />
      </Columns>,
      ['SD-Columns'],
    ),
  ).toMatchInlineSnapshot(`
    .SD-Columns-root {
      display: flex;
    }

    .SD-Columns-column {
      min-width: 0;
    }

    .SD-Columns-layoutDefault {
      flex-direction: row;
    }

    .SD-Columns-layoutDefault.SD-Columns-directionReversed {
      flex-direction: row-reverse;
    }

    .SD-Columns-layoutCollapsed {
      flex-direction: column;
    }

    .SD-Columns-layoutCollapsed.SD-Columns-directionReversed {
      flex-direction: column-reverse;
    }

    .SD-Columns-layoutCollapsed.SD-Columns-directionReversed
      > .SD-Columns-column:first-child
      > .SD-Columns-columnContent {
      padding-bottom: 0;
    }

    .SD-Columns-layoutCollapsed.SD-Columns-directionDefault
      > .SD-Columns-column:last-child
      > .SD-Columns-columnContent {
      padding-bottom: 0;
    }

    .SD-Columns-space1.SD-Columns-layoutDefault {
      margin-left: -8px;
    }

    .SD-Columns-space1.SD-Columns-layoutCollapsed
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-bottom: 8px;
    }

    .SD-Columns-space1.SD-Columns-layoutDefault
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-left: 8px;
    }

    .SD-Columns-space2.SD-Columns-layoutDefault {
      margin-left: -16px;
    }

    .SD-Columns-space2.SD-Columns-layoutCollapsed
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-bottom: 16px;
    }

    .SD-Columns-space2.SD-Columns-layoutDefault
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-left: 16px;
    }

    .SD-Columns-space3.SD-Columns-layoutDefault {
      margin-left: -24px;
    }

    .SD-Columns-space3.SD-Columns-layoutCollapsed
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-bottom: 24px;
    }

    .SD-Columns-space3.SD-Columns-layoutDefault
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-left: 24px;
    }

    .SD-Columns-space4.SD-Columns-layoutDefault {
      margin-left: -32px;
    }

    .SD-Columns-space4.SD-Columns-layoutCollapsed
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-bottom: 32px;
    }

    .SD-Columns-space4.SD-Columns-layoutDefault
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-left: 32px;
    }

    .SD-Columns-space5.SD-Columns-layoutDefault {
      margin-left: -40px;
    }

    .SD-Columns-space5.SD-Columns-layoutCollapsed
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-bottom: 40px;
    }

    .SD-Columns-space5.SD-Columns-layoutDefault
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-left: 40px;
    }

    .SD-Columns-space6.SD-Columns-layoutDefault {
      margin-left: -48px;
    }

    .SD-Columns-space6.SD-Columns-layoutCollapsed
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-bottom: 48px;
    }

    .SD-Columns-space6.SD-Columns-layoutDefault
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-left: 48px;
    }

    .SD-Columns-space7.SD-Columns-layoutDefault {
      margin-left: -56px;
    }

    .SD-Columns-space7.SD-Columns-layoutCollapsed
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-bottom: 56px;
    }

    .SD-Columns-space7.SD-Columns-layoutDefault
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-left: 56px;
    }

    .SD-Columns-space8.SD-Columns-layoutDefault {
      margin-left: -64px;
    }

    .SD-Columns-space8.SD-Columns-layoutCollapsed
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-bottom: 64px;
    }

    .SD-Columns-space8.SD-Columns-layoutDefault
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-left: 64px;
    }

    .SD-Columns-space9.SD-Columns-layoutDefault {
      margin-left: -72px;
    }

    .SD-Columns-space9.SD-Columns-layoutCollapsed
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-bottom: 72px;
    }

    .SD-Columns-space9.SD-Columns-layoutDefault
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-left: 72px;
    }

    .SD-Columns-space10.SD-Columns-layoutDefault {
      margin-left: -80px;
    }

    .SD-Columns-space10.SD-Columns-layoutCollapsed
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-bottom: 80px;
    }

    .SD-Columns-space10.SD-Columns-layoutDefault
      > .SD-Columns-column
      > .SD-Columns-columnContent {
      padding-left: 80px;
    }

    .SD-Columns-alignCenter {
      align-items: center;
    }

    .SD-Columns-alignBottom {
      align-items: flex-end;
    }

    .SD-Columns-widthFluid {
      width: 100%;
    }

    .SD-Columns-widthContent {
      flex-shrink: 0;
    }

    .SD-Columns-width1of2 {
      flex: 0 0 50%;
    }

    .SD-Columns-width1of3 {
      flex: 0 0 33.33333333333333%;
    }

    .SD-Columns-width2of3 {
      flex: 0 0 66.66666666666666%;
    }

    .SD-Columns-width1of4 {
      flex: 0 0 25%;
    }

    .SD-Columns-width3of4 {
      flex: 0 0 75%;
    }

    .SD-Columns-width1of5 {
      flex: 0 0 20%;
    }

    .SD-Columns-width2of5 {
      flex: 0 0 40%;
    }

    .SD-Columns-width3of5 {
      flex: 0 0 60%;
    }

    .SD-Columns-width4of5 {
      flex: 0 0 80%;
    }
  `);
});
