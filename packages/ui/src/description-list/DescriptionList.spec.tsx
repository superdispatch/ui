import { renderComponent, renderCSS } from '@superdispatch/ui-testutils';
import { DescriptionList, DescriptionListItem } from './DescriptionList';

test('label id', () => {
  const { getByLabelText } = renderComponent(
    <DescriptionListItem
      label="Label"
      labelTypographyProps={{ id: 'label-id' }}
      content="Text"
    />,
  );

  expect(getByLabelText('Label')).toMatchInlineSnapshot(`
    <div
      aria-labelledby="label-id"
      class="SD-DescriptionList-item"
    >
      <span
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
    </div>
  `);
});

test('dynamic label id', () => {
  const { getByLabelText } = renderComponent(
    <DescriptionListItem label="Label" content="Text" />,
  );

  expect(getByLabelText('Label')).toMatchInlineSnapshot(`
    <div
      aria-labelledby="uid_2"
      class="SD-DescriptionList-item"
    >
      <span
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
    </div>
  `);
});

test('css', () => {
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
    .SD-DescriptionList-list > .SD-DescriptionList-list:not(:last-child),
    .SD-DescriptionList-list > .SD-DescriptionList-item:not(:last-child) {
      padding-bottom: 16px;
    }

    @media (min-width: 600px) {
      .SD-DescriptionList-list > .SD-DescriptionList-list:not(:last-child),
      .SD-DescriptionList-list > .SD-DescriptionList-item:not(:last-child) {
        padding-bottom: 8px;
      }
    }

    .SD-DescriptionList-listSmall > .SD-DescriptionList-list:not(:last-child),
    .SD-DescriptionList-listSmall > .SD-DescriptionList-item:not(:last-child) {
      padding-bottom: 8px;
    }

    @media (min-width: 600px) {
      .SD-DescriptionList-listSmall > .SD-DescriptionList-list:not(:last-child),
      .SD-DescriptionList-listSmall > .SD-DescriptionList-item:not(:last-child) {
        padding-bottom: 4px;
      }
    }

    .SD-DescriptionList-listLarge > .SD-DescriptionList-list:not(:last-child),
    .SD-DescriptionList-listLarge > .SD-DescriptionList-item:not(:last-child) {
      padding-bottom: 24px;
    }

    @media (min-width: 600px) {
      .SD-DescriptionList-listLarge > .SD-DescriptionList-list:not(:last-child),
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
