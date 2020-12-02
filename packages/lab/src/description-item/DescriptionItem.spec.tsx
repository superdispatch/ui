import { renderComponent } from '@superdispatch/ui-testutils';

import { DescriptionItem } from './DescriptionItem';

test('label id', () => {
  const { getByLabelText } = renderComponent(
    <DescriptionItem id="text" label="Label">
      Text
    </DescriptionItem>,
  );

  expect(getByLabelText('Label')).toMatchInlineSnapshot(`
    <div
      aria-labelledby="text-label"
      class="Columns-SD__sc-6ncr2h-0 eqdATw"
      id="text"
    >
      <div
        class="ColumnRoot-byEqWs hFeTjT"
      >
        <div>
          <span
            class="TextBox-fCKStU eSkwOh"
            id="text-label"
          >
            Label
          </span>
        </div>
      </div>
      <div
        class="ColumnRoot-byEqWs cLAoQi"
      >
        <div>
          <div
            class="TextBox-fCKStU dSbSXe"
          >
            Text
          </div>
        </div>
      </div>
    </div>
  `);
});
