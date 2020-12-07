import { renderComponent } from '@superdispatch/ui-testutils';

import { DescriptionItem } from './DescriptionItem';

test('label id', () => {
  const { getByLabelText } = renderComponent(
    <DescriptionItem id="item" label="Label">
      Content
    </DescriptionItem>,
  );

  expect(getByLabelText('Label')).toMatchInlineSnapshot(`
    <div
      aria-labelledby="item-label"
      class="TextBox__TextBoxRoot-SD__sc-9mywck-0 kAkFaO"
    >
      Content
    </div>
  `);
});

test('aria label', () => {
  const { getByLabelText } = renderComponent(
    <DescriptionItem id="item" aria-label="item label" label="Label">
      Content
    </DescriptionItem>,
  );

  expect(getByLabelText('item label')).toMatchInlineSnapshot(`
    <div
      aria-label="item label"
      class="Columns-SD__sc-6ncr2h-0 ntdTZ"
      id="item"
    >
      <div
        class="Column__ColumnRoot-SD__bzrwgs-0 diAEQg"
      >
        <div>
          <div
            class="Inline__InlineRoot-SD__zf0xat-0 chmaqq"
          >
            <div>
              <div>
                <label
                  class="TextBox__TextBoxRoot-SD__sc-9mywck-0 ibsGop"
                  id="item-label"
                >
                  Label
                </label>
              </div>
              <div>
                <div
                  aria-labelledby="item-label"
                  class="TextBox__TextBoxRoot-SD__sc-9mywck-0 kAkFaO"
                >
                  Content
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});
