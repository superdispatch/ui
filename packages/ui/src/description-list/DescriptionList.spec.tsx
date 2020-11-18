import { renderComponent } from '@superdispatch/ui-testutils';
import React from 'react';

import { DescriptionListItem } from './DescriptionList';

test('label id', () => {
  const { getByLabelText } = renderComponent(
    <DescriptionListItem
      label="Label"
      labelTypographyProps={{ id: 'label-id' }}
      content="Text"
    />,
  );

  expect(getByLabelText('Label')).toMatchInlineSnapshot(`
    <span
      aria-labelledby="label-id"
      class="MuiTypography-root SD-OverflowText-root MuiTypography-body2 MuiTypography-colorTextPrimary MuiTypography-noWrap"
      title="Text"
    >
      <span
        class="MuiTypography-root MuiTypography-body2 MuiTypography-colorTextSecondary"
        id="label-id"
      >
        Label
      </span>
       
      Text
      <span
        class="SD-OverflowText-sentinel"
      />
    </span>
  `);
});

test('dynamic label id', () => {
  const { getByLabelText } = renderComponent(
    <DescriptionListItem label="Label" content="Text" />,
  );

  expect(getByLabelText('Label')).toMatchInlineSnapshot(`
    <span
      aria-labelledby="uid_2"
      class="MuiTypography-root SD-OverflowText-root MuiTypography-body2 MuiTypography-colorTextPrimary MuiTypography-noWrap"
      title="Text"
    >
      <span
        class="MuiTypography-root MuiTypography-body2 MuiTypography-colorTextSecondary"
        id="uid_2"
      >
        Label
      </span>
       
      Text
      <span
        class="SD-OverflowText-sentinel"
      />
    </span>
  `);
});
