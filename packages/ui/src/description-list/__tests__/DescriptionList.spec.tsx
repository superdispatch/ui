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
      ['SuperDispatchDescriptionList'],
    ),
  ).toMatchInlineSnapshot(`
    .SuperDispatchDescriptionList-list {
      margin: -8px 0px;
    }

    .SuperDispatchDescriptionList-list > .SuperDispatchDescriptionList-item {
      padding: 8px 0px;
    }

    @media (min-width: 600px) {
      .SuperDispatchDescriptionList-list {
        margin: -4px 0px;
      }

      .SuperDispatchDescriptionList-list > .SuperDispatchDescriptionList-item {
        padding: 4px 0px;
      }
    }

    .SuperDispatchDescriptionList-listSmall {
      margin: -4px 0px;
    }

    .SuperDispatchDescriptionList-listSmall > .SuperDispatchDescriptionList-item {
      padding: 4px 0px;
    }

    @media (min-width: 600px) {
      .SuperDispatchDescriptionList-listSmall {
        margin: -2px 0px;
      }

      .SuperDispatchDescriptionList-listSmall > .SuperDispatchDescriptionList-item {
        padding: 2px 0px;
      }
    }

    .SuperDispatchDescriptionList-listLarge {
      margin: -12px 0px;
    }

    .SuperDispatchDescriptionList-listLarge > .SuperDispatchDescriptionList-item {
      padding: 12px 0px;
    }

    @media (min-width: 600px) {
      .SuperDispatchDescriptionList-listLarge {
        margin: -8px 0px;
      }

      .SuperDispatchDescriptionList-listLarge > .SuperDispatchDescriptionList-item {
        padding: 8px 0px;
      }
    }

    .SuperDispatchDescriptionList-item {
      display: flex;
      align-items: center;
    }

    .SuperDispatchDescriptionList-icon {
      display: inline-flex;
      margin-right: 8px;
    }

    .SuperDispatchDescriptionList-icon > .MuiSvgIcon-root {
      color: Color.Grey100;
      font-size: 24px;
    }

    @media (min-width: 600px) {
      .SuperDispatchDescriptionList-icon > .MuiSvgIcon-root {
        font-size: 16px;
      }
    }
  `);
});
