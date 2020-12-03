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
      class="Columns-SD__sc-6ncr2h-0 bpLBqx"
      id="text"
    >
      <div
        class="ColumnRoot-byEqWs cLAoQi"
      >
        <div>
          <div
            class="Inline__InlineRoot-SD__zf0xat-0 jLKDqz"
          >
            <div>
              <div>
                <span
                  class="TextBox-fCKStU kWqffC"
                  id="text-label"
                >
                  Label
                </span>
              </div>
              <div>
                <div
                  class="TextBox-fCKStU eVFrJd"
                >
                  Text
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});
