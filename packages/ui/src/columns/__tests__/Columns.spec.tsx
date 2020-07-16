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
    }

    .SuperDispatchColumns-column {
      min-width: 0;
    }

    .SuperDispatchColumns-layoutDefault {
      flex-direction: row;
    }

    .SuperDispatchColumns-layoutDefault.SuperDispatchColumns-directionReversed {
      flex-direction: row-reverse;
    }

    .SuperDispatchColumns-layoutCollapsed {
      flex-direction: column;
    }

    .SuperDispatchColumns-layoutCollapsed.SuperDispatchColumns-directionReversed {
      flex-direction: column-reverse;
    }

    .SuperDispatchColumns-layoutCollapsed.SuperDispatchColumns-directionReversed
      > .SuperDispatchColumns-column:first-child
      > .SuperDispatchColumns-columnContent {
      padding-bottom: 0;
    }

    .SuperDispatchColumns-layoutCollapsed.SuperDispatchColumns-directionDefault
      > .SuperDispatchColumns-column:last-child
      > .SuperDispatchColumns-columnContent {
      padding-bottom: 0;
    }

    .SuperDispatchColumns-space1.SuperDispatchColumns-layoutDefault {
      margin-left: -8px;
    }

    .SuperDispatchColumns-space1.SuperDispatchColumns-layoutCollapsed
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-bottom: 8px;
    }

    .SuperDispatchColumns-space1.SuperDispatchColumns-layoutDefault
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 8px;
    }

    .SuperDispatchColumns-space2.SuperDispatchColumns-layoutDefault {
      margin-left: -16px;
    }

    .SuperDispatchColumns-space2.SuperDispatchColumns-layoutCollapsed
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-bottom: 16px;
    }

    .SuperDispatchColumns-space2.SuperDispatchColumns-layoutDefault
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 16px;
    }

    .SuperDispatchColumns-space3.SuperDispatchColumns-layoutDefault {
      margin-left: -24px;
    }

    .SuperDispatchColumns-space3.SuperDispatchColumns-layoutCollapsed
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-bottom: 24px;
    }

    .SuperDispatchColumns-space3.SuperDispatchColumns-layoutDefault
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 24px;
    }

    .SuperDispatchColumns-space4.SuperDispatchColumns-layoutDefault {
      margin-left: -32px;
    }

    .SuperDispatchColumns-space4.SuperDispatchColumns-layoutCollapsed
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-bottom: 32px;
    }

    .SuperDispatchColumns-space4.SuperDispatchColumns-layoutDefault
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 32px;
    }

    .SuperDispatchColumns-space5.SuperDispatchColumns-layoutDefault {
      margin-left: -40px;
    }

    .SuperDispatchColumns-space5.SuperDispatchColumns-layoutCollapsed
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-bottom: 40px;
    }

    .SuperDispatchColumns-space5.SuperDispatchColumns-layoutDefault
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 40px;
    }

    .SuperDispatchColumns-space6.SuperDispatchColumns-layoutDefault {
      margin-left: -48px;
    }

    .SuperDispatchColumns-space6.SuperDispatchColumns-layoutCollapsed
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-bottom: 48px;
    }

    .SuperDispatchColumns-space6.SuperDispatchColumns-layoutDefault
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 48px;
    }

    .SuperDispatchColumns-space7.SuperDispatchColumns-layoutDefault {
      margin-left: -56px;
    }

    .SuperDispatchColumns-space7.SuperDispatchColumns-layoutCollapsed
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-bottom: 56px;
    }

    .SuperDispatchColumns-space7.SuperDispatchColumns-layoutDefault
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 56px;
    }

    .SuperDispatchColumns-space8.SuperDispatchColumns-layoutDefault {
      margin-left: -64px;
    }

    .SuperDispatchColumns-space8.SuperDispatchColumns-layoutCollapsed
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-bottom: 64px;
    }

    .SuperDispatchColumns-space8.SuperDispatchColumns-layoutDefault
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 64px;
    }

    .SuperDispatchColumns-space9.SuperDispatchColumns-layoutDefault {
      margin-left: -72px;
    }

    .SuperDispatchColumns-space9.SuperDispatchColumns-layoutCollapsed
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-bottom: 72px;
    }

    .SuperDispatchColumns-space9.SuperDispatchColumns-layoutDefault
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-left: 72px;
    }

    .SuperDispatchColumns-space10.SuperDispatchColumns-layoutDefault {
      margin-left: -80px;
    }

    .SuperDispatchColumns-space10.SuperDispatchColumns-layoutCollapsed
      > .SuperDispatchColumns-column
      > .SuperDispatchColumns-columnContent {
      padding-bottom: 80px;
    }

    .SuperDispatchColumns-space10.SuperDispatchColumns-layoutDefault
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
