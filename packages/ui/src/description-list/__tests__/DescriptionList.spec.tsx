import { renderCSS } from '@superdispatch/testutils';
import React from 'react';

import { DescriptionList, DescriptionListItem } from '../DescriptionList';

it('checks component css', () => {
  expect(
    renderCSS(
      <DescriptionList>
        <DescriptionListItem />
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
      color: Color.Grey200;
      font-size: 24px;
    }

    @media (min-width: 600px) {
      .SuperDispatchDescriptionList-icon > .MuiSvgIcon-root {
        font-size: 16px;
      }
    }

    .SuperDispatchDescriptionList-content {
      transition: border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-bottom: 1px dashed transparent;
      margin-bottom: -1px;
    }

    .SuperDispatchDescriptionList-content.SuperDispatchDescriptionList-contentClickable {
      cursor: pointer;
      border-bottom-color: Color.Silver500;
    }

    .SuperDispatchDescriptionList-textOverflowAnchor {
      width: 1px;
      height: 100%;
      display: inline-block;
    }
  `);
});
