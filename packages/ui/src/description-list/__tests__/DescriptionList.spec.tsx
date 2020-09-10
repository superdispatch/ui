import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { DescriptionList, DescriptionListItem } from '../DescriptionList';

it('checks component css', () => {
  expect(
    renderCSS(
      <DescriptionList>
        <DescriptionListItem />
        <DescriptionListItem icon={<div />} />
        <DescriptionListItem label={<div />} />
        <DescriptionListItem content={<div />} />
        <DescriptionListItem label={<div />} content={<div />} />
      </DescriptionList>,
      ['SD-DescriptionList'],
    ),
  ).toMatchInlineSnapshot(`
    .SD-DescriptionList-list > .SD-DescriptionList-item:not(:last-child) {
      padding-bottom: 16px;
    }

    @media (min-width: 600px) {
      .SD-DescriptionList-list > .SD-DescriptionList-item:not(:last-child) {
        padding-bottom: 8px;
      }
    }

    .SD-DescriptionList-listSmall > .SD-DescriptionList-item:not(:last-child) {
      padding-bottom: 8px;
    }

    @media (min-width: 600px) {
      .SD-DescriptionList-listSmall > .SD-DescriptionList-item:not(:last-child) {
        padding-bottom: 4px;
      }
    }

    .SD-DescriptionList-listLarge > .SD-DescriptionList-item:not(:last-child) {
      padding-bottom: 24px;
    }

    @media (min-width: 600px) {
      .SD-DescriptionList-listLarge > .SD-DescriptionList-item:not(:last-child) {
        padding-bottom: 16px;
      }
    }

    .SD-DescriptionList-item {
      display: flex;
      align-items: center;
    }

    .SD-DescriptionList-icon {
      display: inline-flex;
      margin-right: 8px;
    }

    .SD-DescriptionList-icon > .MuiSvgIcon-root {
      color: Color.Grey100;
      font-size: 24px;
    }

    @media (min-width: 600px) {
      .SD-DescriptionList-icon > .MuiSvgIcon-root {
        font-size: 16px;
      }
    }
  `);
});
