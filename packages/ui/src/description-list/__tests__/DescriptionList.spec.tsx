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
    .SD-DescriptionList-list {
      margin: -8px 0px;
    }

    .SD-DescriptionList-list > .SD-DescriptionList-item {
      padding: 8px 0px;
    }

    @media (min-width: 600px) {
      .SD-DescriptionList-list {
        margin: -4px 0px;
      }

      .SD-DescriptionList-list > .SD-DescriptionList-item {
        padding: 4px 0px;
      }
    }

    .SD-DescriptionList-listSmall {
      margin: -4px 0px;
    }

    .SD-DescriptionList-listSmall > .SD-DescriptionList-item {
      padding: 4px 0px;
    }

    @media (min-width: 600px) {
      .SD-DescriptionList-listSmall {
        margin: -2px 0px;
      }

      .SD-DescriptionList-listSmall > .SD-DescriptionList-item {
        padding: 2px 0px;
      }
    }

    .SD-DescriptionList-listLarge {
      margin: -12px 0px;
    }

    .SD-DescriptionList-listLarge > .SD-DescriptionList-item {
      padding: 12px 0px;
    }

    @media (min-width: 600px) {
      .SD-DescriptionList-listLarge {
        margin: -8px 0px;
      }

      .SD-DescriptionList-listLarge > .SD-DescriptionList-item {
        padding: 8px 0px;
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
