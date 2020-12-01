import * as api from '.';

test('api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "Box": React.forwardRef(Box),
      "Column": React.forwardRef(Column),
      "Columns": React.forwardRef(Columns),
      "DescriptionItem": React.forwardRef(DescriptionItem),
      "Inline": React.forwardRef(Inline),
      "LabProvider": [Function],
      "Stack": React.forwardRef(Stack),
      "TextBox": React.forwardRef(TextBox),
      "isCollapsedBelow": [Function],
      "normalizeSpace": [Function],
      "toResponsivePropTuple": [Function],
      "useResponsivePropTuple": [Function],
    }
  `);
});
