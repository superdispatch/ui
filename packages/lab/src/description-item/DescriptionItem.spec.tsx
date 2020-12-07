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
      class="Columns-SD__sc-6ncr2h-0 ntdTZ"
      id="text"
    >
      <div
        class="Column__ColumnRoot-SD__bzrwgs-0 diAEQg"
      >
        <div>
          <div
            class="Inline__InlineRoot-SD__zf0xat-0 jKpyvD"
          >
            <div>
              <div>
                <span
                  class="TextBox__TextBoxRoot-SD__sc-9mywck-0 ibsGop"
                  id="text-label"
                >
                  Label
                </span>
              </div>
              <div>
                <div
                  class="TextBox__TextBoxRoot-SD__sc-9mywck-0 kAkFaO"
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

test('aria label', () => {
  const { getByLabelText } = renderComponent(
    <DescriptionItem id="text" aria-label="Label">
      Text
    </DescriptionItem>,
  );

  expect(getByLabelText('Label')).toMatchInlineSnapshot(`
    <div
      aria-label="Label"
      class="Columns-SD__sc-6ncr2h-0 ntdTZ"
      id="text"
    >
      <div
        class="Column__ColumnRoot-SD__bzrwgs-0 diAEQg"
      >
        <div>
          <div
            class="Inline__InlineRoot-SD__zf0xat-0 jKpyvD"
          >
            <div>
              <div>
                <div
                  class="TextBox__TextBoxRoot-SD__sc-9mywck-0 kAkFaO"
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
